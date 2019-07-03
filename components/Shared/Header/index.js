import { useState } from 'react'
import { connect } from 'react-redux'
import { Tooltip } from 'antd'
import styled from 'styled-components'
import { MenuSlider } from '<components>'

const index = ({ page, pageName, auth, ...rest }) => {
  const [visible, setVisible] = useState(false)
  const titleDrawer = `Hi, ${auth.User ? auth.User.email : 'Guest'}`
  return (
    <Container>
      <HeaderContainer>
        <MainContainer>
          <MenuContainer onClick={() => setVisible(true)}>
            <MenuIcon src="/static/images/menu.png" />
          </MenuContainer>

          <LabelPage>{pageName}</LabelPage>
        </MainContainer>

        <UserNameContainer>
          <Tooltip placement="leftTop" title={auth.User ? auth.User.email : ''}>
            <UserNameLabel>{auth.User ? auth.User.email : ''}</UserNameLabel>
          </Tooltip>
        </UserNameContainer>
      </HeaderContainer>
      <MenuSlider visible={visible} onClose={() => setVisible(!visible)} closable={false} placement={'left'} title={titleDrawer} auth={auth} />
    </Container>
  )
}

export default connect(({ auth }) => ({ auth }))(index)

const Container = styled.div`
  display: ${props => (props.noHeader ? 'none' : 'block')};
`

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  @media (min-width: 600px) {
    height: 64px;
  }
  height: 56px;
  background-color: #001529;
  color: rgba(255, 255, 255, 0.65);

  display: flex;
  align-items: center;
  z-index: 10;
`
const MenuContainer = styled.div`
  width: 50px;
  height: 100%;
  padding: 15px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 10px;

  cursor: pointer;
`

const MenuIcon = styled.img`
  width: 100%;
  cursor: pointer;
`

const MainContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
`

const UserNameContainer = styled.div`
  width: 10%;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 600px) {
    display: none;
  }
  padding-right: 20px;
`

const UserNameLabel = styled.label`
  font-size: 14px;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const LabelPage = styled.label`
  font-size: 20px;
  font-weight: 100;
`
