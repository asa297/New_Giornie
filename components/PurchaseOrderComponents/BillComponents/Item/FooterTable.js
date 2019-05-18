import React from 'react'
import numeral from 'numeral'

export default class FooterTable extends React.PureComponent {
  render() {
    const { grandtotal } = this.props
    return (
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: '70%',
            height: '35px',
            borderStyle: 'solid',
            borderWidth: '0px 0px 2px 2px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '13px',
            paddingLeft: '7px',
          }}
        >
          หมายเหตุ
        </div>
        <div
          style={{
            width: '15%',
            height: '35px',
            borderStyle: 'solid',
            borderWidth: '0px 0px 2px 2px',
            fontSize: '13px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <font>รวมยอดทั้งสิ้น</font>
          <font style={{ marginTop: '-8px' }}>Grand Total</font>
        </div>
        <div
          style={{
            width: '15%',
            height: '35px',
            borderStyle: 'solid',
            borderWidth: '0px 2px 2px 2px',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '5px',
          }}
        >
          {numeral(grandtotal).format('0,0.00')} ฿
        </div>
      </div>
    )
  }
}