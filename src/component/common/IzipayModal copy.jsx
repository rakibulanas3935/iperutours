import { useEffect } from "react";
import KRGlue from '@lyracom/embedded-form-glue'
export default function PaymentForm({ formToken }) {
	useEffect(() => {
		if (!formToken) return;

		const loadIzipay = async () => {
			try {
				// Add theme CSS (optional but recommended)
				const themeCss = document.createElement("link");
				themeCss.rel = "stylesheet";
				themeCss.href =
					"https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/neon-reset.min.css";
				document.head.appendChild(themeCss);

				const themeScript = document.createElement("script");
				themeScript.src =
					"https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/neon.js";
				document.head.appendChild(themeScript);

				// Load Krypton script
				const script = document.createElement("script");
				script.src =
					"https://api.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js";
				script.async = true;

				script.onload = () => {
					// global KR object - Izipay client API
					window.KR.setFormConfig({
						formToken: formToken,
						publicKey:
							"43924425:testpublickey_zSqnmUEtUPqAW503YmUakRSR42lSJdqnNE20w4NBTgEzy",
						language: "en-US",
					});

					window.KR.mount("#myPaymentForm");

					window.KR.onFormReady(async() => {
						console.log("IZIPAY form ready");

						// 🔒 Hide the two dropdowns
						const style = document.createElement("style");
						style.innerHTML = `
							#myPaymentForm .kr-payment-method,
							#myPaymentForm .kr-installment {
								display: none !important;
							}
						`;
						document.head.appendChild(style);
					});

					window.KR.onSuccess((payload) =>
						console.log("frontend got success event", payload)
					);
					window.KR.onError((err) => console.error("IZIPAY error", err));
				};

				document.body.appendChild(script);
			} catch (err) {
				console.error(err);
			}
		};

		loadIzipay();
	}, [formToken]);

	return <div id="myPaymentForm" className="kr-smart-form"></div>;
}
