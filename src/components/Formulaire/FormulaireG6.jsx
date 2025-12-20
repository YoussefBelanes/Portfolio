import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaCheckCircle,
  FaPaperPlane,
  FaExclamationTriangle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { sendEmail } from "../../Services/emailservice";
import { createFormSubmission } from "../../api/formSubmissionsApi";

const ContactForm = () => {
  const [formValid, setFormValid] = useState({
    nom: false,
    email: false,
    message: false,
    priority: true,
    send: false,
    sended: false,
    sending: false,
  });

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
    priority: "moyenne",
  });

  const [touched, setTouched] = useState({
    nom: false,
    email: false,
    message: false,
  });

  const errorMessage = {
    nom: "Le nom doit contenir au moins 3 caractères",
    email: "Merci d'entrer un email valide",
    message: "Le message doit contenir au moins 10 caractères",
  };

  const verificationFormulaire = () => {
    const validations = {
      nom: formData.nom.length > 3,
      email: formData.email.includes("@") && formData.email.includes("."),
      message: formData.message.length > 10,
      priority: true,
    };

    const allValid =
      validations.nom && validations.email && validations.message;

    setFormValid((prev) => ({
      ...prev,
      ...validations,
      send: allValid,
    }));

    return allValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (touched[e.target.name]) verificationFormulaire();
  };

  const handleBlur = (name) => {
    setTouched({ ...touched, [name]: true });
    verificationFormulaire();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verificationFormulaire()) return;

    setFormValid((prev) => ({ ...prev, sending: true }));

    try {
      await createFormSubmission({
        ...formData,
        createdAt: new Date().toISOString(),
        status: "new",
      });

      await sendEmail(formData);
      await new Promise((r) => setTimeout(r, 1200));

      setFormValid({
        nom: false,
        email: false,
        message: false,
        priority: true,
        send: false,
        sended: true,
        sending: false,
      });

      setFormData({
        nom: "",
        email: "",
        message: "",
        priority: "moyenne",
      });

      setTouched({
        nom: false,
        email: false,
        message: false,
      });

      setTimeout(() => {
        setFormValid((prev) => ({ ...prev, sended: false }));
      }, 3500);
    } catch (err) {
      setFormValid((prev) => ({ ...prev, sending: false }));
    }
  };

  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      {/* Background — SAME AS ABOUT */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_#0ff4_1px,_transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-700/10" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-cyan-400 tracking-wider">Entrons en contact</p>
          <h2 className="text-5xl md:text-6xl font-bold mt-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Contact
          </h2>
          <p className="max-w-2xl mx-auto mt-6 text-gray-300 text-lg">
            Une question, une opportunité ou une collaboration ?  
            Envoyez-moi un message.
          </p>
        </motion.div>

        {/* Success */}
        {formValid.sended && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-4 bg-white/5 border border-cyan-500/30 backdrop-blur-xl p-6 rounded-xl"
          >
            <FaCheckCircle className="text-3xl text-cyan-400" />
            <div>
              <h3 className="text-lg font-semibold text-cyan-200">
                Message envoyé !
              </h3>
              <p className="text-gray-300 text-sm">
                Merci pour votre message, je vous répondrai rapidement.
              </p>
            </div>
          </motion.div>
        )}

        {/* Form Card */}
        <div className="bg-white/5 border border-cyan-500/30 backdrop-blur-xl rounded-2xl p-10 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="text-sm text-cyan-300 flex items-center gap-2">
                  <FaUser /> Nom complet
                </label>
                <input
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  onBlur={() => handleBlur("nom")}
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-black/40 border border-cyan-500/30 text-white focus:border-cyan-400 outline-none"
                />
                {touched.nom && !formValid.nom && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                    <FaExclamationTriangle /> {errorMessage.nom}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-cyan-300 flex items-center gap-2">
                  <FaEnvelope /> Email
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-black/40 border border-cyan-500/30 text-white focus:border-cyan-400 outline-none"
                />
                {touched.email && !formValid.email && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                    <FaExclamationTriangle /> {errorMessage.email}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm text-cyan-300 flex items-center gap-2">
                <FaCommentDots /> Message
              </label>
              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={() => handleBlur("message")}
                className="mt-2 w-full px-4 py-3 rounded-xl bg-black/40 border border-cyan-500/30 text-white focus:border-cyan-400 outline-none resize-none"
              />
              {touched.message && !formValid.message && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                  <FaExclamationTriangle /> {errorMessage.message}
                </p>
              )}
            </div>

            {/* Priority */}
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-cyan-500/30 text-cyan-200"
            >
              <option value="haute">🔴 Haute priorité</option>
              <option value="moyenne">🟡 Priorité moyenne</option>
              <option value="basse">🟢 Basse priorité</option>
            </select>

            {/* Submit */}
            <button
              type="submit"
              disabled={!formValid.send || formValid.sending}
              className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3
              bg-gradient-to-r from-cyan-400 to-purple-500 text-black transition
              ${
                formValid.send
                  ? "hover:opacity-90"
                  : "opacity-40 cursor-not-allowed"
              }`}
            >
              {formValid.sending ? "Envoi..." : <><FaPaperPlane /> Envoyer</>}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {[
            { label: "Email", value: "belanes.youssef1@gmail.com" },
            { label: "Téléphone", value: "+216 56 710 899" },
            { label: "Localisation", value: "Tunisie" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-cyan-500/30 backdrop-blur-xl p-6 rounded-xl text-center"
            >
              <h3 className="text-cyan-300 font-semibold">{item.label}</h3>
              <p className="text-gray-300">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
