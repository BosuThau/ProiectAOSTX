export default async function handler(req, res) {
  const { ip } = req.query;

  if (!ip) {
    return res.status(400).json({ error: 'IP not provided' });
  }

  const url = `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Key': process.env.ABUSE_API_KEY, // Cheia API
      'Accept': 'application/json',
    },
  });

  const data = await response.json();

  if (response.ok) {
    res.status(200).json({ data: data.data });
  } else {
    res.status(response.status).json({ error: data });
  }
}
