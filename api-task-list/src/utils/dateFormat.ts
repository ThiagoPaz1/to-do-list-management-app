export function dateFormat(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {timeZone: "UTC"}).format(
    new Date(date)
  )
}