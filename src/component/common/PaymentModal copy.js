"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import CommonLoader from "./CommonLoader";
import KRGlue from "@lyracom/embedded-form-glue";
import { toast } from "react-toastify";
import Head from "next/head";
import Script from "next/script";

export default function PaymentModal({ formToken, onClose }) {

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
        <AnimatePresence>
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
            {open && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="relative w-full max-w-md rounded-2xl bg-[var(--color-neutral-background)] border border-[var(--color-neutral-line)] p-6 shadow-xl"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-[var(--color-text-body)] hover:text-[var(--color-accent-pink)] transition"
                        >
                            <X size={20} />
                        </button>
                        <div id="myPaymentForm" className="kr-smart-form text-center w-full"></div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
