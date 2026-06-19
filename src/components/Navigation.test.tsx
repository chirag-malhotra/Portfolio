import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { I18nProvider } from '../i18n/I18nContext'
import store from '../store'
import Navigation from './Navigation'

describe('Navigation - Language Switcher', () => {
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <I18nProvider>
          <Navigation onOpenTerminal={function (): void {
            throw new Error('Function not implemented.')
          } } />
        </I18nProvider>
      </Provider>,
    )
  }

  test('renders language switcher', () => {
    renderComponent()
    const switcher = screen.getByLabelText(/select language/i)
    expect(switcher).toBeInTheDocument()
  })

  test('has English, Spanish, German, and Dutch options', () => {
    renderComponent()
    const englishOption = screen.getByRole('option', { name: /english/i })
    const spanishOption = screen.getByRole('option', { name: /español/i })
    const germanOption = screen.getByRole('option', { name: /deutsch/i })
    const dutchOption = screen.getByRole('option', { name: /nederlands/i })

    expect(englishOption).toBeInTheDocument()
    expect(spanishOption).toBeInTheDocument()
    expect(germanOption).toBeInTheDocument()
    expect(dutchOption).toBeInTheDocument()
  })

  test('changes language when option is selected', async () => {
    renderComponent()
    const switcher = screen.getByLabelText(/select language/i) as HTMLSelectElement

    expect(switcher.value).toBe('en')

    fireEvent.change(switcher, { target: { value: 'es' } })

    await waitFor(() => {
      expect(switcher.value).toBe('es')
    })
  })

  test('theme toggle button is present', () => {
    renderComponent()
    const themeToggle = screen.getByRole('button', { name: /switch to/i })
    expect(themeToggle).toBeInTheDocument()
  })
})
