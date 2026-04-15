export async function getWorkingDaysUntilMonthEnd(date) {
  if (!date) throw new Error("date requise");

  const isWeekend = (d) => {
    const day = d.getDay();
    return day === 0 || day === 6;
  };

  const formatDate = (d) => d.toISOString().split("T")[0];

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let endDate = 0;
  if (month === 12) {
    month = 0; // janvier de l'année suivante
    year = date.getFullYear() + 1;
    endDate = new Date(year, month, 0);
  } else {
    endDate = new Date(year, month, 0); // premier jour du mois suivant
  }

  // récupération dynamique des jours fériés (France)
  const res = await fetch(
    `https://calendrier.api.gouv.fr/jours-feries/metropole/${year}.json`
  );

  if (!res.ok) {
    throw new Error("Erreur API jours fériés");
  }

  const holidaysJson = await res.json();
  const holidays = new Set(Object.keys(holidaysJson));

  // boucle sur les jours
  const current = new Date(date);
  let count = 0;

  while (current <= endDate) {
    const formatted = formatDate(current);

    const weekend = isWeekend(current);
    const holiday = holidays.has(formatted);

    if (!weekend && !holiday) {
      count++;
    }

    current.setDate(current.getDate() + 1);
  }

  return count;
}