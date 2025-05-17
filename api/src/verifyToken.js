export default async function handler(req, res) {
  try {
    const secret = '6Lch7TIrAAAAAIxh9AUu1OQ5fC6ntMhsIpn1rTWA';
    const { token } = req.query;

    const query = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    const apiResponse = await query.json();
    res.status(200).json({ success: apiResponse?.success, score: apiResponse?.score });
  } catch (error) {
    console.log('Error is', error);
    res.status(500).json({ success: false, score: -1 });
  }
}