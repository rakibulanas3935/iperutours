import { useEffect } from "react";
import KRGlue from "@lyracom/embedded-form-glue";
import { toast } from "react-toastify";
import Head from "next/head";
import Script from "next/script";
export default function PaymentForm({ formToken, }) {
	useEffect(() => {
		async function setupPaymentForm() {
			const endpoint = "https://api.micuentaweb.pe";
			const publicKey =
				"43924425:testpublickey_zSqnmUEtUPqAW503YmUakRSR42lSJdqnNE20w4NBTgEzy";

			try {
				const { KR } = await KRGlue.loadLibrary(endpoint, publicKey);

				await KR.setFormConfig({
					formToken,
					"kr-language": "en-US",
				});

				await KR.renderElements("#myPaymentForm");

				KR.onSubmit(async (paymentData) => {
					console.log("Payment data received:", paymentData);

					try {
						const response = await fetch(
							"http://localhost:3000/validatePayment",
							{
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify({
									clientAnswer: paymentData.clientAnswer,
									hash: paymentData.hash,
								}),
							}
						);

						if (response.ok) {
							toast.success("Payment successful!");
							// KR.close();
						} else {
							const err = await response.text();
							toast.error("Payment failed: " + err);
						}
					} catch (err) {
						toast.error("Error validating payment: " + err.message);
					}

					return false; // prevent default KR redirect
				});
			} catch (error) {
				setMessage(error + " (see console for more details)");
				console.error(error);
			}
		}

		setupPaymentForm();
	}, []);

	return (
		<div>
			<Head>
				<title>NextJS</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				 <link
    rel="stylesheet"
    href="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/neon-reset.min.css"
  />
  <link
    rel="stylesheet"
    href="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/kr-embedded.min.css"
  />
			</Head>
			<Script src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js" />
			<Script src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/neon.js" />
			<div className="container">
				<div id="myPaymentForm">
					<div className="kr-smart-form" />
				</div>
				{/* <div data-test="payment-message">{message}</div> */}
			</div>
		</div>
	);
}
