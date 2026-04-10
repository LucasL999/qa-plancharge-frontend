export async function getWorkingDaysUntilYearEnd(date) {
  if (!date) throw new Error("date requise");

  const isWeekend = (d) => {
    const day = d.getDay();
    return day === 0 || day === 6;
  };

  const formatDate = (d) => d.toISOString().split("T")[0];

  const year = date.getFullYear();
  const endDate = new Date(year, 11, 31);

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