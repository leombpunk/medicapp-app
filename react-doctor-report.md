Fix the top 3 React Doctor issues in frontend on this pass — leave the rest for a follow-up.

1. ERROR Security: socket/low-supply-chain-score (×1)
   `axios@1.2.2` scored 25/100 on Socket's vulnerability axis (minimum 50). This points to known security vulnerabilities (CVEs) affecting this version. Other axes — supply chain 99, maintenance 95, quality 100, license 100.
   - package.json:12
2. WARN Performance: Import from a barrel file (×66)
   This ships extra code to your users & slows page load. Import directly from: "./pages/Configurations", "./pages/ScheduleSetting", "./pages/Home", "./pages/Login", "./pages/NotFound", "./pages/Patient", "./pages/PatientsIndex", "./pages/Register", "./pages/Schedule", "./pages/SchedulesIndex", "./pages/UserPage", "./pages/TreatmentsIndex", "./pages/Profesional", "./pages/ProfesionalStats", "./pages/Turns".
   Curl with no cache & follow the canonical fix and false positive check recipe before fixing: https://react.doctor/docs/rules/react-doctor/no-barrel-import
   - src/react/App.jsx:8
   - src/react/components/basis/Table.jsx:3
   - src/react/components/basis/TableV2.jsx:3
   - +63 more files
   Migration-scale (66 files): fix a representative sample, confirm the recipe holds, and get the code owner's sign-off before changing the rest in one pass.
3. WARN Maintainability: deslop/unused-file (×32)
   Unused file is not reachable from any entry point, so it adds maintenance surface without shipping any code.
   - src/react/components/EventException.jsx
   - src/react/components/PatientsTable.jsx
   - src/react/components/ProfesionalTable.jsx
   - +29 more files

Full results for all 435 issues (diagnostics.json + a .txt per rule): C:\Users\PCcito\AppData\Local\Temp\react-doctor-b8a312a9-7e0c-49ab-8bad-f245dbbcf9ad

Read each file and fix the root cause — don't suppress or silence the rule.

Findings that share a `fixGroupId` (in diagnostics.json) are one root cause — a single fix clears all of them, so treat each `fixGroupId` as ONE task, not one per site.

Verify against the real thing, don't assume: confirm each change matches the canonical fix recipe you fetched for that rule, then re-run `npx react-doctor@latest --verbose` and check the issue is actually gone against the real tool before moving on.

Teach me as you go: for every issue you touch, explain it in plain language (no jargon) — what the problem is, why it's a problem, and how serious it is in human terms. Describe the real-world impact and severity concretely (e.g. "this crashes the page for users on Safari" vs. "this is a minor cleanup with no user impact") so I understand why it matters, not just what changed.

Then work through the rest from the full results above.