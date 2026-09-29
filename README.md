# ♻️ Kabadiwala Connect: Formalizing the Informal Recycling Chain
**Smart India Hackathon 2026 | Problem Statement 229 (Ministry of Mines)**

## 📌 The Problem: The EPR Disconnect & Hazardous Backyard Processing
India's Extended Producer Responsibility (EPR) framework under the E-Waste (Management) Rules, 2022 mandates strict recycling targets. However, formal recyclers lack last-mile reach, while informal street collectors (Kabadiwalas) handle 90% of e-waste collection but remain locked out of the formal ecosystem. This forces informal workers to sell to middlemen at exploitative rates or resort to hazardous backyard processing (e.g., open-air cable burning, acid leaching of PCBs), losing critical minerals like lithium and cobalt.

## 🚀 The Solution: Kabadiwala Connect
A vernacular, low-literacy, offline-tolerant mobile web platform that bridges the gap between informal scrap collectors and government-authorized Material Recovery Facilities (MRFs). It enables price discovery, dynamic GPS routing, and traceable digital handovers.

### 🔑 Core Features & SIH Rubric Alignment
*   **Dual-Tier Identity Verification:** Implements length-based routing. Registered collectors use their 12-digit e-Shram UAN for formal "Fast-Lane" access, while new/unregistered collectors use their 4-digit Aadhaar ending to generate a "Provisional Pass" for spot-onboarding at the factory gate.
*   **Voice AI & Vernacular UI:** Fully supports English, Hindi, and Marathi. Integrates native Web Speech API for low-literacy users to log scrap weights and categories strictly via voice commands.
*   **Transparent Price Discovery (Bhav Board):** Real-time display of authorized benchmark rates for high-value e-waste (PCBs, Lithium-Ion Batteries, Copper Cables), equipped with Text-to-Speech audio dictation to eliminate middleman exploitation.
*   **Haversine GPS Load Balancing:** The 2D Smart Scheduler calculates the live Haversine distance between the collector and regional scrapyards, cross-referencing live queue times to route trucks to the fastest available facility.
*   **Digital Gate Pass & Geofencing:** Generates a verifiable handover record with a unique Token ID, timestamp, and scrap breakdown. The pass dynamically unlocks via GPS geofencing when the truck arrives at the assigned weighing bay.
*   **Pictorial & Audio Safety Guidance:** Integrates mandatory safety protocols prohibiting cable burning and acid leaching, delivered via accessible visual cards and multi-lingual audio prompts.
*   **Manager Analytics & Financial Ledger:** Empowers yard managers to view pending trucks, total inbound tonnage, and dynamically calculated cash payout requirements for the day.

## 💻 Tech Stack
*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (Zero external heavy frameworks to ensure ultra-lightweight performance on entry-level Android devices).
*   **Backend & Database:** Google Apps Script (REST API) + Google Sheets (Structured datasets for Material, Price, Recycler, and Transaction Traceability).
*   **Integrations:** Web Speech API (Voice AI), Geolocation API, Twilio API (SMS Alerts).

## 📊 Unit Economics & Sustainability Model
*   **Current State:** A collector sells 10kg of mixed PCBs to a middleman at an exploitative **₹80/kg** (Total: ₹800).
*   **Via Kabadiwala Connect:** The collector routes directly to an authorized yard at the official rate of **₹250/kg** (Total: ₹2,500).
*   **Platform Revenue:** For every kilogram of formalized e-waste, the authorized recycler generates an EPR Credit. The platform sustains operations by charging a **2% Technology Facilitation Fee** to the recycler per successful EPR transaction. The informal collector uses the platform for free.
*
