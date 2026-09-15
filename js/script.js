class HybridSelect {
  constructor(rootElement) {
    this.root = rootElement
    this.originalSelect = this.root.querySelector('[data-js-select-original]')
    this.toggleButton = this.root.querySelector('[data-js-select-toggle]')
    this.currentText = this.root.querySelector('[data-js-select-current]')
    this.options = Array.from(this.root.querySelectorAll('[data-js-select-option]'))

    this.init()
  }

  init() {
    this.toggleButton.addEventListener('click', () => this.toggle())

    this.options.forEach((option) => {
      option.addEventListener('click', () => this.selectOption(option))
    })

    document.addEventListener('click', (e) => {
      if (!this.root.contains(e.target)) {
        this.close()
      }
    })

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close()
      }
    })
  }

  toggle() {
    const isOpen = this.root.classList.contains('is-open')
    if (isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  open() {
    this.root.classList.add('is-open')
    this.toggleButton.setAttribute('aria-expanded', 'true')
  }

  close() {
    this.root.classList.remove('is-open')
    this.toggleButton.setAttribute('aria-expanded', 'false')
  }

  selectOption(optionElement) {
    const val = optionElement.dataset.value
    const labelText = optionElement.textContent.trim()

    this.originalSelect.value = val
    this.originalSelect.dispatchEvent(new Event('change', { bubbles: true }))

    this.currentText.textContent = labelText

    this.options.forEach((opt) => {
      const isSelected = opt === optionElement
      opt.classList.toggle('is-selected', isSelected)
      opt.setAttribute('aria-selected', String(isSelected))
    })

    this.close()
  }
}

document.querySelectorAll('[data-js-select]').forEach((el) => {
  new HybridSelect(el)
})
