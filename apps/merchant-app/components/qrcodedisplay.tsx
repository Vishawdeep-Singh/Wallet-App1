import QRCode from 'react-qr-code';
import { generateToken } from '../actions/generateToken';

async function fetchToken() {
  try {
    const response = await generateToken();

    if (response.message === 'success') {
      return {
        success: true,
        token: response.token,
        message: 'Token fetched successfully.',
      };
    } else {
      return {
        success: false,
        token: null,
        message: response.message,
      };
    }
  } catch (err) {
    console.error('Error fetching token:', err);
    return {
      success: false,
      token: null,
      message: 'An unexpected error occurred.',
    };
  }
}

export default async function () {
  const result = await fetchToken();

  if (!result.success) {
    return <div>Error: {result.message}</div>;
  }

  return (
    <div>
      <QRCode
        size={256}
        style={{ height: 'auto', maxWidth: '50%', width: '50%' }}
        value={result.token ?? 'null'}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
}
