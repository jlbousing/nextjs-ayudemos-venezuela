import { getAppUrl } from "@/lib/config/app-url";

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY no configurada. Se omitió el envío de correo.");
    return;
  }

  const from =
    process.env.EMAIL_FROM ?? "Ayudemos Venezuela <hola@ayudemos-venezuela.com>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`No se pudo enviar el correo: ${errorBody}`);
  }
}

export async function buildVolunteerJoinedEmail({
  creatorName,
  initiativeTitle,
  volunteerName,
  volunteerEmail,
  volunteerPhone,
  initiativeId,
}: {
  creatorName: string;
  initiativeTitle: string;
  volunteerName: string;
  volunteerEmail: string;
  volunteerPhone: string;
  initiativeId: string;
}) {
  const adminUrl = `${await getAppUrl()}/iniciativas/${initiativeId}/admin`;
  const phoneLine = volunteerPhone
    ? `<p><strong>Teléfono:</strong> ${volunteerPhone}</p>`
    : "";

  return {
    subject: `Nuevo voluntario en "${initiativeTitle}"`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #171717;">
        <p>Hola ${creatorName},</p>
        <p><strong>${volunteerName}</strong> se unió como voluntario a tu iniciativa <strong>${initiativeTitle}</strong>.</p>
        <p><strong>Correo:</strong> ${volunteerEmail}</p>
        ${phoneLine}
        <p>
          <a href="${adminUrl}" style="color: #171717;">Ver iniciativa y contactar voluntarios</a>
        </p>
        <p style="color: #737373; font-size: 14px;">Ayudemos Venezuela</p>
      </div>
    `,
  };
}
