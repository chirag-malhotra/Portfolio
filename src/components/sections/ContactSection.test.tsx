import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { I18nProvider } from '../../i18n/I18nContext'
import store from '../../store'
import ContactSection from './ContactSection'

jest.mock('@emailjs/browser', () => ({
  __esModule: true,
  default: {
    send: jest.fn().mockImplementation(() => Promise.resolve({ status: 200, text: 'OK' })),
  },
}))

describe('ContactSection', () => {
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <I18nProvider>
          <ContactSection />
        </I18nProvider>
      </Provider>,
    )
  }

  test('renders contact form', () => {
    renderComponent()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  test('shows validation errors when form is submitted empty', async () => {
    renderComponent()
    const submitButton = screen.getByRole('button', { name: /send/i })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/message is required/i)).toBeInTheDocument()
    })
  })

  test('shows email validation error for invalid email', async () => {
    renderComponent()
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitButton = screen.getByRole('button', { name: /send/i })

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument()
    })
  })

  test('submits form with valid data', async () => {
    renderComponent()
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement
    const submitButton = screen.getByRole('button', { name: /send/i })

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument()
    })

    // Check that form is reset after submission
    await waitFor(() => {
      expect(nameInput.value).toBe('')
      expect(emailInput.value).toBe('')
      expect(messageInput.value).toBe('')
    }, { timeout: 3000 })
  })
})
