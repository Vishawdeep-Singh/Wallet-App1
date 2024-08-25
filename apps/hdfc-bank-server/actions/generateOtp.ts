'use server';
import twilio from 'twilio';

const client = twilio('df', 'dfd');
export async function GenerateOtp(number: string) {
  try {
    const verification = await client.verify.v2
      .services('VA8137360825643e3e2b4629c4e662c752')
      .verifications.create({ to: `+91${number}`, channel: 'sms' });
    return {
      message: 'OTP sent',
      sid: verification.sid,
    };
  } catch (error: any) {
    return {
      error: 'Failed to send otp' + '   ' + error.message,
    };
  }
}
