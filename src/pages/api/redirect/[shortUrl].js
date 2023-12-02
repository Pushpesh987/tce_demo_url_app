// pages/api/redirect/[shortUrl].js
import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  const { shortUrl } = req.query;

  const { data, error } = await supabase
    .from('tce_ppk')
    .select('original_url')
    .eq('short_url', shortUrl)
    .single();

  if (error) {
    return res.status(500).json({ error: 'Error fetching data from the database' });
  }

  if (data) {
    const baseUrl = req.headers.host;
    res.writeHead(301, { Location: data.original_url.replace(baseUrl, '') });
    res.end();
  } else {
    res.status(404).json({ error: 'Short URL not found' });
  }
}
