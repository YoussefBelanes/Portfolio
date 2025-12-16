

import React, { useState } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaCheckCircle,
  FaPaperPlane,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { sendEmail } from '../../Services/emailservice';
import { createFormSubmission } from "../../api/formSubmissionsApi";

const ContactForm = () => {
  const [formValid, setFormValid] = useState({
    fullName: false,
    email: false,
    message: false,
    priorité: true,
    send: false,
    sended: false,
    sending: false,
  });

  const errorMessage = {
    nom: 'Le nom doit contenir au moins 3 caractères',
    email: "Merci d'entrer un email valide",
    message: 'Le message doit contenir au moins 10 caractères',
  };

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: '',
    priorité: 'moyenne',
  });

  const [touched, setTouched] = useState({
    nom: false,
    email: false,
    message: false,
  });

  const verificationFormulaire = () => {
    const validations = {
      nom: formData.nom.length > 3,
      email: formData.email.includes('@') && formData.email.includes('.'),
      message: formData.message.length > 10,
      priorité: true,
    };

    const allValid = validations.nom && validations.email && validations.message;

    setFormValid({
      ...formValid,
      ...validations,
      send: allValid,
    });

    return allValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (touched[e.target.name]) {
      setTimeout(() => verificationFormulaire(), 80);
    }
  };

  const handleBlur = (name) => {
    setTouched({ ...touched, [name]: true });
    verificationFormulaire();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verificationFormulaire()) return;

    setFormValid({ ...formValid, sending: true });

    try {

      await createFormSubmission({
       ...formData,
       createdAt: new Date().toISOString(),
       status: 'new' // new | in-progress | done
      });

      const result = await sendEmail(formData);
      await new Promise((res) => setTimeout(res, 1500));

      setFormValid({
        ...formValid,
        sending: false,
        sended: true,
      });

      setFormData({
        nom: '',
        email: '',
        message: '',
        priorité: 'moyenne',
      });

      setTouched({
        nom: false,
        email: false,
        message: false,
      });

      setTimeout(() => {
        setFormValid({
          nom: false,
          email: false,
          message: false,
          priorité: true,
          send: false,
          sended: false,
          sending: false,
        });
      }, 3500);
    } catch (error) {
      console.log(error);
      setFormValid({ ...formValid, sending: false });
    }
  };

  return (
    <section className="relative py-32 px-6 bg-[#05060a] overflow-hidden text-cyan-100">

      {/* ---------------- BACKGROUND BLOB GLOWS ---------------- */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-40 w-[650px] h-[650px] rounded-full 
                        bg-gradient-to-tr from-[#063a7a] via-[#0b5fd8] to-transparent 
                        opacity-30 blur-3xl animate-blob"></div>

        <div className="absolute -right-32 top-24 w-[520px] h-[520px] rounded-full
                        bg-gradient-to-br from-[#0b3d6b] via-[#4cc9f0] to-transparent
                        opacity-25 blur-3xl animate-blob animation-delay-2000"></div>

        {/* GRID */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0 L0 0 0 40" fill="none" stroke="#0b4f6a" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* ---------------- FORM CONTAINER ---------------- */}
      <div className="relative max-w-5xl mx-auto">

        {/* SUCCESS MESSAGE */}
        {formValid.sended && (
          <div className="mb-8 p-5 rounded-xl border border-cyan-400/20
                          bg-gradient-to-r from-cyan-300/10 via-blue-300/10 to-purple-300/10
                          backdrop-blur-md shadow-lg animate-fade-in">
            <div className="flex items-center gap-4">
              <FaCheckCircle className="text-3xl text-cyan-300" />
              <div>
                <h3 className="text-lg font-semibold text-cyan-200">Message envoyé !</h3>
                <p className="text-cyan-200/70 text-sm">Merci pour votre message.</p>
              </div>
            </div>
          </div>
        )}

        {/* CARD */}
        <div className="bg-white/5 border border-cyan-700/20 rounded-3xl backdrop-blur-md shadow-2xl">

          {/* TOP BAR */}
          <div className="h-1 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300"></div>

          <div className="p-10">
            <h2 className="text-4xl font-extrabold mb-3 text-cyan-100">Contactez-moi</h2>
            <p className="text-cyan-200/70 mb-10">Remplissez le formulaire ci-dessous</p>

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* ---------------- NAME & EMAIL ---------------- */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* NAME INPUT */}
                <div>
                  <label className="flex items-center gap-2 text-sm text-cyan-200">
                    <FaUser className="text-cyan-300" /> Nom complet
                  </label>

                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    onBlur={() => handleBlur('nom')}
                    placeholder="Votre nom"
                    className={`w-full px-4 py-3 mt-2 rounded-xl bg-black/40 border-2 text-cyan-100
                                transition-all 
                                ${touched.nom
                                  ? formValid.nom
                                    ? 'border-cyan-400'
                                    : 'border-red-500'
                                  : 'border-cyan-700/40'
                                }`}
                  />

                  {touched.nom && !formValid.nom && (
                    <p className="flex items-center gap-2 text-red-400 text-sm mt-2">
                      <FaExclamationTriangle /> {errorMessage.nom}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <label className="flex items-center gap-2 text-sm text-cyan-200">
                    <FaEnvelope className="text-cyan-300" /> Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    onBlur={() => handleBlur('email')}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="exemple@mail.com"
                    className={`w-full px-4 py-3 mt-2 rounded-xl bg-black/40 border-2 text-cyan-100
                                transition-all 
                                ${touched.email
                                  ? formValid.email
                                    ? 'border-cyan-400'
                                    : 'border-red-500'
                                  : 'border-cyan-700/40'
                                }`}
                  />

                  {touched.email && !formValid.email && (
                    <p className="flex items-center gap-2 text-red-400 text-sm mt-2">
                      <FaExclamationTriangle /> {errorMessage.email}
                    </p>
                  )}
                </div>
              </div>

              {/* ---------------- MESSAGE ---------------- */}
              <div>
                <label className="flex items-center gap-2 text-sm text-cyan-200">
                  <FaCommentDots className="text-cyan-300" /> Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur('message')}
                  rows="6"
                  className={`w-full px-4 py-3 mt-2 rounded-xl bg-black/40 border-2 text-cyan-100 resize-none
                              transition-all 
                              ${touched.message
                                ? formValid.message
                                  ? 'border-cyan-400'
                                  : 'border-red-500'
                                : 'border-cyan-700/40'
                              }`}
                  placeholder="Votre message..."
                />

                {touched.message && !formValid.message && (
                  <p className="flex items-center gap-2 text-red-400 text-sm mt-2">
                    <FaExclamationTriangle /> {errorMessage.message}
                  </p>
                )}
              </div>

              {/* ---------------- PRIORITÉ ---------------- */}
              <div>
                <label className="text-sm text-cyan-200">Priorité</label>

                <select
                  name="priorité"
                  value={formData.priorité}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 bg-black/40 border-2 border-cyan-700/40 rounded-xl text-cyan-200"
                >
                  <option value="haute">🔴 Haute</option>
                  <option value="moyenne">🟡 Moyenne</option>
                  <option value="basse">🟢 Basse</option>
                </select>
              </div>

              {/* ---------------- SUBMIT BUTTON ---------------- */}
              <button
                type="submit"
                disabled={!formValid.send || formValid.sending}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3
                            bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 
                            text-black shadow-xl transition-all
                            ${formValid.send && !formValid.sending
                              ? 'hover:opacity-90 hover:-translate-y-1'
                              : 'opacity-40 cursor-not-allowed'
                            }`}
              >
                {formValid.sending ? (
                  <>
                    <div className="animate-spin w-6 h-6 rounded-full border-2 border-black/40 border-b-transparent"></div>
                    Envoi...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Envoyer
                  </>
                )}
              </button>

              <p className="text-center text-cyan-200/60 text-sm">
                Vos données restent confidentielles.
              </p>
            </form>
          </div>

          {/* BOTTOM GRADIENT LINE */}
          <div className="h-6 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"></div>
        </div>

        {/* ---------------- CONTACT CARDS ---------------- */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {[
            { icon: '📧', label: 'Email', value: 'belanes.youssef1@gmail.com' },
            { icon: '📱', label: 'Téléphone', value: '+216 56 710 899' },
            { icon: '📍', label: 'Adresse', value: 'Tunisie' },
          ].map((item, i) => (
            <div
              key={i}
              className="px-6 py-5 rounded-xl bg-white/5 border border-cyan-700/20 backdrop-blur-md
                         text-center shadow-xl hover:bg-white/10 transition"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-cyan-200">{item.label}</h3>
              <p className="text-cyan-100/80">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- ANIMATIONS ---------------- */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px,0px) scale(1); }
          33% { transform: translate(25px,-20px) scale(1.05); }
          66% { transform: translate(-20px,30px) scale(0.95); }
          100% { transform: translate(0px,0px) scale(1); }
        }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn .4s ease forwards; }
      `}</style>
    </section>
  );
};

export default ContactForm;
