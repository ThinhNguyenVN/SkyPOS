import { NativeModules } from 'react-native'
const { BixolonPrinterModule } = NativeModules
interface IBixolonPrinterModule {
  helloPrinter(msg: string): void
  printText(content: string): void
  cutPage(): void
  connectToPrinter(ip: string): Promise<void>
  disconnectPrinter(): void
  printTitle(title: string): void
  printBoldText(text: string): void
}
export default BixolonPrinterModule as IBixolonPrinterModule
