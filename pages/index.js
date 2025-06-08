import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Cyber Threat Monitor</h1>
      <p>Aplicație pentru analiză IP-uri suspecte</p>

      <ul>
        <li><Link href="/csr">IP Check (CSR)</Link></li>
       
      </ul>
    </div>
  )
}
