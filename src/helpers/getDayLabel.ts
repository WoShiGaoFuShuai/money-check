export const getDayLabel = (timestamp: number) => {
  const today = new Date()
  const dateTimestamp = new Date(timestamp)

  if (today.toDateString() === dateTimestamp.toDateString()) {
    return "Today"
  } else {
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    if (yesterday.toDateString() === dateTimestamp.toDateString()) {
      return "Yesterday"
    } else {
      const day = dateTimestamp.getDate()
      const month = dateTimestamp.toLocaleString("en-US", { month: "long" })
      return `${day} ${month}`
    }
  }
}
