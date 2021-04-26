import React from 'react'
import Login, { LoginProps } from './Login'
import SVGLogo from '../../components/SVGLogo/SVGLogo'
import styled from '../../theme-styled'
import { LoginFormProps } from './components/DefaultForm'
import { AppInfo, AppInfoProvider } from '../../providers/AppInfoProvider'

export default {
  title: 'Scenes/Login',
  component: Login,
  argTypes: {}
}

const Template = (props: LoginProps & { appInfo: AppInfo }) => {
  return <AppInfoProvider appInfo={props.appInfo}>
    <Login {...props} />
  </AppInfoProvider>
}

const PcsLogoContainer = styled.div`
  height: 70px;
  font-size: 2em;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
  z-index: 99999;
  letter-spacing: 0.1em;

  img {
    height: 100%;
    margin-right: 15px;
  }
`

const PcsLogo = () => {
  return <PcsLogoContainer onClick={() => window.open('http://pcs-publishing.com')}>
    <img src="https://www.pcs-publishing.com/wp-content/uploads/2020/11/PCS-LOGO-hires.png" />
    <span>PCS-PUBLISHING</span>
  </PcsLogoContainer>
}


export const NoParticles = Template.bind({})

NoParticles.args = {
  appInfo: {
    appName: 'Knowledge Planning',
    appLogo: (large: boolean) => <SVGLogo src="/redis.svg" size={large ? 400 : 50} />
  }
}

export const WithParticles = Template.bind({})

WithParticles.args = {
  particles: true,
  appInfo: {
    appName: 'Falcon 9',
    appLogo: (large: boolean) => <SVGLogo src="/spacex.svg" size={large ? 600 : 50} />
  }
}


export const WithCustomParticles = Template.bind({})

WithCustomParticles.args = {
  appInfo: {
    appName: 'Particles',
    appLogo: (large: boolean) => <SVGLogo src="/react-2.svg" size={large ? 400 : 50} />
  },
  particles: {
    "particles": {
      "number": {
        "value": 10,
        "density": {
          "enable": true,
          "value_area": 600
        }
      },
      "line_linked": {
        "enable": true
      },
      "move": {
        "speed": 1,
        "out_mode": "out"
      },
      "shape": {
        "type": [
          "image"
        ],
        "image": [
          {
            "src": "/react-2.svg",
            "height": 100,
            "width": 100
          }
        ]
      },
      "color": {
        "value": "#CCC"
      },
      "size": {
        "value": 100,
        "random": false,
        "anim": {
          "enable": true,
          "speed": 4,
          "size_min": 10,
          "sync": false
        }
      }
    },
    "retina_detect": false
  }
}

export const Header = Template.bind({})
Header.args = {
  particles: true,
  appInfo: {
    appName: 'Knowledge Planning',
    appLogo: (large: boolean) => <SVGLogo src="/redis.svg" size={large ? 400 : 50} />
  },
  header: <PcsLogo />
}

export const Footer = Template.bind({})
Footer.args = {
  particles: true,
  appInfo: {
    appName: 'Knowledge Planning',
    appLogo: (large: boolean) => <SVGLogo src="/redis.svg" size={large ? 400 : 50} />
  },
  footer: <PcsLogo />
}

const OtherForm = (_props: LoginFormProps) => {
  return <div>I am an alternate form, you can put whatever you want here as long as the form component takes the LoginFormProps</div>
}

export const AlternateForm = Template.bind({})

AlternateForm.args = {
  particles: true,
  appInfo: {
    appName: 'Knowledge Planning',
    appLogo: (large: boolean) => <SVGLogo src="/redis.svg" size={large ? 400 : 50} />
  },
  form: OtherForm,
}
