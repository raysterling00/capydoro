$i = (query) => document.getElementById(query)
$q = (query) => document.querySelector(query)
$qa = (query) => document.querySelectorAll(query)

const config_minutes = 25
const config_minutes_unfocus = 5
let progress = 0
let timer_minutes = config_minutes
let timer_minutes_unformat = timer_minutes * 60
let timer_seconds = 0
let leftoverTime = timer_minutes_unformat

let is_runnin = false
let capydoro_mode = "focus"

$qa(".progressbar-progress").forEach((allProgresses) => {
	allProgresses.style.width = `0%`
})

let pomodoroInterval001
/*$i("nav-main").onclick = () => {
	if (is_runnin) {
		clearInterval(pomodoroInterval001)
		is_runnin = false
		$i("nav-main").textContent = "+"
	} else {
		is_runnin = true
		$i("nav-main").textContent = "||"

		$qa(".timer").forEach((el) => {
			el.textContent = `${timer_minutes.toString().padStart(2, "0")}:${timer_seconds.toString().padStart(2, "0")}`
		})

		pomodoroInterval001 = setInterval(() => {
			leftoverTime -= 1
			progress = ((timer_minutes_unformat - leftoverTime) / timer_minutes_unformat) * 100
			console.log(progress)
			$qa(".progressbar-progress").forEach((allProgresses) => {
				allProgresses.style.width = `${progress}%`

				if (progress >= 100) {
					clearInterval(pomodoroInterval001)
				}
			})

			timer_seconds -= 1
			if (timer_seconds < 0) {
				timer_minutes -= 1
				timer_seconds = 59
			}
			if (timer_minutes < 0) {
				clearInterval(pomodoroInterval001)
				timer_minutes = 0
				timer_seconds = 0
			}
			$qa(".timer").forEach((el) => {
				el.textContent = `${timer_minutes.toString().padStart(2, "0")}:${timer_seconds.toString().padStart(2, "0")}`
			})
		}, 1000)

		if (leftoverTime <= 0) {
			$qa(".progressbar-progress").forEach((allProgresses) => {
				allProgresses.style.width = `0%`
			})
			progress = 0
			clearInterval(pomodoroInterval001)
			timer_minutes = config_minutes
			timer_minutes_unformat = timer_minutes * 60
			leftoverTime = timer_minutes_unformat
			timer_seconds = 0
		}
	}
}
*/

$i("nav-main").onclick = () => {
	if (is_runnin) {
		clearInterval(pomodoroInterval001)
		is_runnin = false
		$i("nav-main").textContent = "+"
	} else {
		is_runnin = true
		$i("nav-main").textContent = "||"

		if (leftoverTime <= 0) {
			if (capydoro_mode === "focus") {
				capydoro_mode = "break"
				timer_minutes = config_minutes_unfocus

				$qa(".progressbar-bar, .progressbar-progress").forEach((el) => el.classList.add("unfocus"))
			} else {
				capydoro_mode = "focus"
				timer_minutes = config_minutes
				$qa(".progressbar-bar, .progressbar-progress").forEach((el) => el.classList.remove("unfocus"))
			}

			timer_minutes_unformat = timer_minutes * 60
			leftoverTime = timer_minutes_unformat
			timer_seconds = 0
			progress = 0

			$qa(".progressbar-progress").forEach((allProgresses) => {
				allProgresses.style.width = `0%`
			})
		}

		$qa(".timer").forEach((el) => {
			el.textContent = `${timer_minutes.toString().padStart(2, "0")}:${timer_seconds.toString().padStart(2, "0")}`
		})

		pomodoroInterval001 = setInterval(() => {
			leftoverTime -= 1
			progress = ((timer_minutes_unformat - leftoverTime) / timer_minutes_unformat) * 100

			$qa(".progressbar-progress").forEach((allProgresses) => {
				allProgresses.style.width = `${progress}%`
			})

			timer_seconds -= 1
			if (timer_seconds < 0) {
				timer_minutes -= 1
				timer_seconds = 59
			}

			if (timer_minutes < 0) {
				clearInterval(pomodoroInterval001)
				is_runnin = false
				$i("nav-main").textContent = "+"

				timer_minutes = 0
				timer_seconds = 0
				leftoverTime = 0
				//alert(capydoro_mode === "focus" ? "¡Foco terminado! Toca un break de capibara 🍊" : "¡Break terminado! De vuelta al código 💻")
			}

			$qa(".timer").forEach((el) => {
				el.textContent = `${timer_minutes.toString().padStart(2, "0")}:${timer_seconds.toString().padStart(2, "0")}`
			})
		}, 1000)
	}
}
