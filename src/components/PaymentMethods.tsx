/* eslint-disable import/extensions */
import { Text, HStack } from 'native-base';
import Barcode from '@assets/icons/barcode-regular.svg';
import QrCode from '@assets/icons/qr-code-regular.svg';
import Money from '@assets/icons/money-regular.svg';
import CreditCard from '@assets/icons/credit-card-regular.svg';
import Bank from '@assets/icons/bank-regular.svg';
import { IPaymentMethodObject, PaymentMethodsTypes } from '@dtos/ProductDTO';

type Props = { paymentsArray: IPaymentMethodObject[] | PaymentMethodsTypes[] };

export function PaymentMethods({ paymentsArray }: Props) {
  let paymentMethods: PaymentMethodsTypes[] = [];
  if (paymentsArray.length > 0 && typeof paymentsArray[0] !== 'string') {
    paymentMethods = (paymentsArray as IPaymentMethodObject[]).map(
      method => method.key,
    );
  } else {
    paymentMethods = paymentsArray as PaymentMethodsTypes[];
  }
  return (
    <>
      {paymentMethods.includes('boleto') && (
        <HStack mb="1" alignItems="center">
          <Barcode width={20} height={20} />
          <Text ml={2} color="gray.300">
            Boleto
          </Text>
        </HStack>
      )}
      {paymentMethods.includes('pix') && (
        <HStack mb="1" alignItems="center">
          <QrCode width={20} height={20} />
          <Text ml={2} color="gray.300">
            Pix
          </Text>
        </HStack>
      )}
      {paymentMethods.includes('deposit') && (
        <HStack mb="1" alignItems="center">
          <Bank width={20} height={20} />
          <Text ml={2} color="gray.300">
            Depósito Bancário
          </Text>
        </HStack>
      )}
      {paymentMethods.includes('cash') && (
        <HStack mb="1" alignItems="center">
          <Money width={20} height={20} />
          <Text ml={2} color="gray.300">
            Dinheiro
          </Text>
        </HStack>
      )}
      {paymentMethods.includes('card') && (
        <HStack mb="1" alignItems="center">
          <CreditCard width={20} height={20} />
          <Text ml={2} color="gray.300">
            Cartão de Crédito
          </Text>
        </HStack>
      )}
    </>
  );
}
