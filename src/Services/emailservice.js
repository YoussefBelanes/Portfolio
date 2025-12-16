import emailjs from '@emailjs/browser';

export const sendEmail = async (formData) => {
  try {
    await emailjs.send(
      'service_I2aqriv',
      'template_szy93zb',
      formData,
      'OLUuBuw92fRDp7An9'
    );
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};