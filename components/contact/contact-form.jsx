import React, { useState, useEffect } from 'react';
import Notification from '../ui/notification';
import classes from './contact-form.module.css';

export default function ContactForm() {
	const [message, setMessage] = useState({
		message: '',
		name: '',
		email: '',
	});
	const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
	const [requestError, setRequestError] = useState();

	async function sendContactData(contactDetails) {
		const response = await fetch('/api/contact', {
			method: 'POST',
			body: JSON.stringify(contactDetails),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || 'Something went wrong!');
		}
	}

	function handleChange(event) {
		setMessage({
			...message,
			[event.target.id]: event.target.value,
		});
	}

	useEffect(() => {
		if (requestStatus === 'success' || requestStatus === 'error') {
			const timer = setTimeout(() => {
				setRequestStatus(null);
				setRequestError(null);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [requestStatus]);

	async function sendMessageHandler(event) {
		event.preventDefault();

		// optional: add client-side validation

		setRequestStatus('pending');

		try {
			await sendContactData(message);
			setRequestStatus('success');
			setMessage({
				message: '',
				name: '',
				email: '',
			});
		} catch (error) {
			setRequestError(error.message);
			setRequestStatus('error');
		}
	}

	let notification;

	if (requestStatus === 'pending') {
		notification = {
			status: 'pending',
			title: 'Sending message...',
			message: 'Your message is on its way!',
		};
	}

	if (requestStatus === 'success') {
		notification = {
			status: 'success',
			title: 'Success!',
			message: 'Message sent successfully!',
		};
	}

	if (requestStatus === 'error') {
		notification = {
			status: 'error',
			title: 'Error!',
			message: requestError,
		};
	}

	return (
		<section className={classes.contact}>
			<h1>How Can I Help You? </h1>
			<form className={classes.form} onSubmit={sendMessageHandler}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor='email'>Your Email</label>
						<input
							type='email'
							id='email'
							value={message.email}
							required
							onChange={handleChange}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor='name'>Your Name</label>
						<input
							type='text'
							id='name'
							onChange={handleChange}
							required
							value={message.name}
						/>
					</div>
				</div>
				<div className={classes.control}>
					<label htmlFor='message'>Your Message</label>
					<textarea
						id='message'
						rows='5'
						onChange={handleChange}
						value={message.message}></textarea>
				</div>
				<div className={classes.actions}>
					<button>Send Message</button>
				</div>
			</form>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
		</section>
	);
}
