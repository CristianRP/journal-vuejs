const months = ['January', 'February', 'March', 'Aphril', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const days   = ['Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thuesday', 'Friday', 'Saturday']

const getDayMonthYear = ( dateString ) => {
  const date = new Date( dateString )

  return {
    day: date.getDate(),
    month: months[ date.getMonth() ],
    yearDay: `${ date.getFullYear() }, ${ days[ date.getDay() ] }`
  }
}

export default getDayMonthYear
