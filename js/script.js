const select = document.querySelector('[data-select]')
const toggle = select.querySelector('[data-select-toggle]')
const currentText = select.querySelector('[data-select-current]')
const hiddenInput = select.querySelector('[data-select-input]')
const items = select.querySelectorAll('.select__item')

toggle.addEventListener('click', () => {
  const isOpen = select.classList.toggle('is-open')
  toggle.setAttribute('aria-expanded', String(isOpen))
})

items.forEach(item => {
  item.addEventListener('click', () => {
    items.forEach(el => {
      el.classList.remove('select__item--selected')
      el.setAttribute('aria-selected', 'false')
    })

    item.classList.add('select__item--selected')
    item.setAttribute('aria-selected', 'true')

    currentText.textContent = item.textContent.trim()
    hiddenInput.value = item.dataset.value

    select.classList.remove('is-open')
    toggle.setAttribute('aria-expanded', 'false')
  })
})

document.addEventListener('click', (e) => {
  if (!select.contains(e.target)) {
    select.classList.remove('is-open')
    toggle.setAttribute('aria-expanded', 'false')
  }
})
