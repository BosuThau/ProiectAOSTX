## 1. Introducere

Aplicația realizată în cadrul acestui proiect are ca scop verificarea unei adrese IP din perspectiva securității cibernetice. Mai exact, proiectul constă într-o aplicație web interactivă care permite utilizatorilor să verifice dacă o adresă IP a fost implicată în activități suspecte, precum spam, atacuri cibernetice sau alte acțiuni malițioase. Proiectul a fost dezvoltat folosind Next.js, un framework pentru React care permite construirea de aplicații full-stack, inclusiv rutare API pe server-side.
	Datele sunt obținute în timp real prin interogarea a două API-uri externe: AbuseIPDB, pentru reputația IP-ului, și ipwho.is, pentru informații de geolocalizare. Ulterior, aceste date sunt procesate și afișate în interfață. De asemenea, fiecare căutare efectuată este salvată într-o bază de date MongoDB Atlas, permițând astfel agregarea rezultatelor și afișarea unui istoric în format grafic.
	Aplicația este publicată și găzduită în cloud prin intermediul platformei Vercel, care gestionează automat procesul de build și deploy continuu.
	Tehnologii utilizate:
-	Next.js – pentru aplicația web și gestionarea rutelor API
-	MongoDB Atlas – pentru persistarea și gestionarea datelor în cloud
-	Vercel – pentru deploy și hosting
-	Leaflet.js – pentru afișarea poziției IP-ului pe hartă
-	Recharts – pentru reprezentarea vizuală a istoricului căutărilor

---

## 2. Descriere problemă

Adresele IP pot deveni surse de activitate dăunătoare în rețea, fiind utilizate pentru spam, atacuri informatice, tentative de phishing sau ca parte a rețelelor botnet. În contextul actual al securității informatice, identificarea rapidă a unei surse potențial malițioase devine esențială. Prin urmare, scopul aplicației este de a permite unui utilizator să verifice dacă un IP a fost anterior raportat pentru abuzuri. În plus, sunt oferite detalii precum țara de proveniență, furnizorul de servicii (ISP) și coordonatele geografice. Funcționalitatea aplicației include și salvarea căutărilor efectuate, pentru a putea analiza ulterior frecvența și distribuția scorurilor de abuz ale IP-urilor interogate.

---

## 3. Descriere API

a) API-uri externe folosite

1. AbuseIPDB
Link: https://www.abuseipdb.com
Este un serviciu care returnează un „abuseConfidenceScore” și numărul de raportări pentru o adresă IP.
Pentru a putea folosi acest API, mi-am creat un cont și am generat o cheie API personală.

2. ipwho.is
Link: https://ipwho.is
API gratuit, fără autentificare, folosit pentru a obține locația geografică a unui IP (țară, oraș, latitudine, longitudine).

b) API intern propriu (Next.js)
Am creat un endpoint intern /api/searches, care gestionează salvarea și citirea istoricului:

---

## 4. Flux aplicație

a) Utilizatorul introduce o adresă IP.

b) Se face o cerere către AbuseIPDB pentru scorul de abuz.

c) Se face o altă cerere către ipwho.is pentru locație (oraș, țară, coordonate).

d) Datele sunt afișate în aplicație:

   - Detalii IP
   - Hartă cu locația
   - Grafic cu scorurile din istoric
     
e) Se salvează căutarea în MongoDB printr-o metodă POST către /api/searches.

f) Se preiau toate căutările salvate printr-o metodă GET și sunt afișate într-un grafic Recharts.

Exemplu request / response și metode HTTPS:

![image](https://github.com/user-attachments/assets/588bc003-449a-4fbf-a3d9-fa8a108e5155)
![image](https://github.com/user-attachments/assets/c4e684b0-8d7c-4ef1-8096-4ac418ea809f)


---

  ## 5. Capturi ecran aplicație
  
![{450495E0-5103-4634-AC8C-449184534CEA}](https://github.com/user-attachments/assets/6fa2d3b8-d827-4191-881e-7ceda5b4d4c9)

![{874610B9-FCE2-44EF-B362-181B2BBD091E}](https://github.com/user-attachments/assets/ead07020-0142-4522-b368-421184ab767d)

![{1DA9C286-4A97-4077-B3A1-7F2851CE7A66}](https://github.com/user-attachments/assets/bcb68c3a-1bb0-4c20-8c1a-e80b104a29d2)

![{B48293F9-F55D-43D4-A7D2-132A93A802DD}](https://github.com/user-attachments/assets/470c475e-cb13-4673-8bff-60f739672099)

![{5334076E-FCC1-46AD-B07A-4E9743C20177}](https://github.com/user-attachments/assets/42f2236a-8a69-4422-88d3-4d454f142da9)

---

  ## 6. Setup MongoDB

![image](https://github.com/user-attachments/assets/ef66a28d-7866-4ff2-a821-0778058e56bd)

![image](https://github.com/user-attachments/assets/533da758-5f1c-4161-a167-2d2e12a4b801)

![image](https://github.com/user-attachments/assets/3b792ac6-1ea3-417f-ac88-385cce22c41d)

![image](https://github.com/user-attachments/assets/82b89576-a1e0-4217-a470-4f3db9cfd066)

![image](https://github.com/user-attachments/assets/520a6e6f-f762-42d4-b9bd-8061d9413e08)

![image](https://github.com/user-attachments/assets/9654abf8-32f0-4774-acf2-e6124d88b8a4)
 
---

  ## 7. Setup AbuseIPDB API
  
![image](https://github.com/user-attachments/assets/493226d3-5d38-44a7-a2d8-e7695d0117be)

![image](https://github.com/user-attachments/assets/ba03ebb2-d782-4800-99c6-b67fdaac6a91)

![image](https://github.com/user-attachments/assets/e3d4cfae-716b-4809-a121-8c4894b8d0fd)

---

  ## 8. Setup Vercel

![image](https://github.com/user-attachments/assets/825ed78a-406f-49bc-a215-397102a264ab)

![image](https://github.com/user-attachments/assets/763ee43f-d629-4045-b28b-53dc1b843641)

![image](https://github.com/user-attachments/assets/5cc0758c-d5cc-4143-96e6-d9c64e88cd64)

![image](https://github.com/user-attachments/assets/a3ab3bec-77e8-4d53-be4b-b9645ce3542a)

 
---


  ## 9. Referințe

- **Next.js** – framework pentru React cu API routes
- **MongoDB Atlas** – bază de date cloud pentru salvarea istoricului
- **Vercel** – platformă de hosting și deploy automat
- **Leaflet** – afișarea locației IP-ului pe hartă
- **Recharts** – grafic pentru afișarea scorurilor IP-urilor verificate
- **AbuseIPDB** – API
- **ipwho.is ** – API




