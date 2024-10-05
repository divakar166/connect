import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (
  email: string,
  token: string,
  type: string
) => {
  const confirmLink = `https://nextjobportal.vercel.app/auth/new-verification?token=${token}&type=${type}`;
  await resend.emails.send({
    from:"info@divakarsingh.online",
    to:email,
    subject:"Connect - Confirm your email",
    html:`<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  })
}