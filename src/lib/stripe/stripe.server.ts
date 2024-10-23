import { redirect } from '@sveltejs/kit'
import { dev } from '$app/environment'
import { PRIVATE_STRIPE_SECRET_KEY, ZOHO_PASSPHRASE } from '$env/static/private'
import { PUBLIC_AUTHDOMAIN } from '$env/static/public'
import { addCustomClaims } from '$lib/firebase/admin.server'
import type { UserRecord } from 'firebase-admin/auth'
import { v4 as uuidv4 } from 'uuid';
import * as nodemailer from 'nodemailer';
import Stripe from 'stripe'

const url = dev ? 'http://localhost:5173' : `https://${PUBLIC_AUTHDOMAIN}`
export const checkoutSessionParameter = 'checkoutSession'

export const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15'
})

const sendMail = async (user: UserRecord) => {
	const transporter = nodemailer.createTransport({
		host: 'smtppro.zoho.eu',
		port: 465,
		secure: true,
		auth: {
		  user: 'info@haunted-horizon.com',
		  pass: ZOHO_PASSPHRASE,
		},
	  });
  
	const mailOptions = {
		from: 'info@haunted-horizon.com',
		to: user.email,
		subject: 'Your Purchase Code',
		text: `Thank you for your purchase! Here is your unique code: ${uuidv4()}`,
	  };

	  try {
		await transporter.sendMail(mailOptions);
		console.log('Email sent successfully');
	  } catch (error) {
		console.error('Error sending email:', error);
	  }
}

export const checkout = async (user: UserRecord, price: string) => {
	const customer = await getCustomer(user)

	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price: price as string,
				quantity: 1
			}
		],
		customer: customer.id,
		customer_update: {
			address: 'auto'
		},
		mode: 'payment',
		success_url: `${url}/pricing?${checkoutSessionParameter}={CHECKOUT_SESSION_ID}`,
		cancel_url: `${url}/pricing`,
		automatic_tax: { enabled: true }
	})

	await sendMail(user)

	throw redirect(303, session.url as string)
}

export const getCustomer = (user: UserRecord) => {
	if (user.customClaims?.stripe_customer_id) {
		return stripe.customers.retrieve(user.customClaims.stripe_customer_id as string)
	} else {
		return createCustomer(user)
	}
}

const createCustomer = async (user: UserRecord) => {
	const customer = await stripe.customers.create({
		name: user.displayName,
		email: user.email,
		metadata: {
			uid: user.uid
		}
	})
	await addCustomClaims(user, { stripe_customer_id: customer.id })
	return customer
}

export const getPortal = async (user: UserRecord) => {
	if (!user.customClaims?.stripe_customer_id) throw new Error('No Stripe customer ID found.')
	return await stripe.billingPortal.sessions.create({
		customer: user.customClaims.stripe_customer_id as string
	})
}

export const openPortal = async (user: UserRecord) => {
	const portal = await getPortal(user)
	throw redirect(303, portal.url as string)
}
