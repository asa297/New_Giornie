import * as Yup from 'yup'
import { FieldIsEmpty, FieldIsPercentRange, FieldIsMoreThan, FieldIsLessThan, FieldIsPositiveNumber } from './validators'

export const OrganizationSchema = Yup.object().shape({
  orgType: Yup.object().required('Required'),
  orgName: Yup.string().required('Required'),
  orgComA: Yup.number()
    .min(0, 'number must more than 0.')
    .max(100, 'maximum number is 100.')
    .required('Required'),
  orgComB: Yup.number()
    .min(0, 'number must more than 0.')
    .max(100, 'maximum number is 100.'),
  orgCode: Yup.string().required('Required'),
})

export const GroupSchema = Yup.object().shape({
  org: Yup.object().required('Required'),
  groupCode: Yup.string().required('Required'),
  groupStickerNumber: Yup.number().typeError('Number Only'),
  guideName: Yup.string().required('Required'),
})

export const SellerSchema = Yup.object().shape({
  sellerName: Yup.string().required('Required'),
  sellerCode: Yup.string().required('Required'),
  sellerCom: Yup.number()
    .min(0, 'number must more than 0.')
    .max(100, 'maximum number is 100.')
    .required('Required'),
})

export const ItemSchema = Yup.object().shape({
  itemType: Yup.object().required('Required'),
  itemCode: Yup.string().required('Required'),
  itemName: Yup.string().required('Required'),
  itemPrice: Yup.number()
    .typeError('Number Only')
    .min(0, 'number must more than 0.')
    .required('Required'),
})

export const PurchaseOrderSchema = Yup.object().shape({
  group: Yup.object().required('Required'),
  seller: Yup.object().required('Required'),
  discount: Yup.number()
    .min(0, 'number must more than 0.')
    .max(100, 'maximum number is 100.'),
  credit: Yup.number().min(0, 'number must more than 0.'),
  creditCharge: Yup.number()
    .min(0, 'number must more than 0.')
    .max(100, 'maximum number is 100.'),

  grandTotal: Yup.number().min(0, 'number must more than 0.'),
})

export const PurchaseOrderValidation = value => {
  let errors = {}

  if (FieldIsEmpty(value.group)) {
    errors.group = FieldIsEmpty(value.group)
  }

  if (FieldIsEmpty(value.seller)) {
    errors.seller = FieldIsEmpty(value.seller)
  }

  if (FieldIsPercentRange(value.discount)) {
    errors.discount = FieldIsPercentRange(value.discount)
  }

  if (FieldIsMoreThan(value.credit, value.subTotal, 'Credit must less than Subtotal')) {
    errors.credit = FieldIsMoreThan(value.credit, value.subTotal, 'Credit must less than Subtotal')
  }

  if (FieldIsPercentRange(value.creditCharge)) {
    errors.creditCharge = FieldIsPercentRange(value.creditCharge)
  }

  if (FieldIsMoreThan(value.grandTotalDiscount, value.subTotal, 'Discount total must less than Subtotal')) {
    errors.grandTotalDiscount = FieldIsMoreThan(value.grandTotalDiscount, value.subTotal, 'Discount total must less than Subtotal')
  }

  if (FieldIsMoreThan(value.grandTotalCredit, value.subTotal, 'Credit total must less than Subtotal')) {
    errors.grandTotalCredit = FieldIsMoreThan(value.grandTotalCredit, value.subTotal, 'Credit total must less than Subtotal')
  }

  if (FieldIsPositiveNumber(value.grandTotal)) {
    errors.grandTotal = FieldIsPositiveNumber(value.grandTotal)
  }

  if (FieldIsEmpty(value.receiveCash)) {
    errors.receiveCash = FieldIsEmpty(value.receiveCash)
  } else if (FieldIsLessThan(value.receiveCash, value.grandTotal, 'ReceiveCash total must more than Grandtotal')) {
    errors.receiveCash = FieldIsLessThan(value.receiveCash, value.grandTotal, 'ReceiveCash total must more than Grandtotal')
  }

  if (FieldIsPositiveNumber(value.changeCash)) {
    errors.changeCash = FieldIsPositiveNumber(value.changeCash)
  }

  console.log(errors)
  return errors
}
