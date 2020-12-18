import React from 'react'
import HtmlPreview, { HtmlPreviewProps } from './HtmlPreview'
import styled from '../../theme-styled';

export default {
  title: 'HTML Preview',
  component: HtmlPreview
}

const Container = styled.div`
  height: 100vh;
`

export const Example = (props: HtmlPreviewProps) => {
  return <Container>
    <HtmlPreview {...props} />
  </Container>
}

Example.args = {
  html: `
  <html>
    <head>
      <title>Yes</title>
    </head>
    <body>
     <div class="item">1</div>
     <div class="item">2</div>
     <div class="item">3</div>
     <div class="item">4</div>
     <div class="item">5</div>
     <div class="item">6</div>
     <div class="item">7</div>
     <div class="item">8</div>
     <div class="item">9</div>
     <div class="item">10</div>
     <div class="item">11</div>
     <div class="item">12</div>
     <div class="item">13</div>
     <div class="item">14</div>
     <div class="item">15</div>
     <div class="item">16</div>
     <div class="item">17</div>
     <div class="item">18</div>
     <div class="item">19</div>
     <div class="item">20</div>
     <div class="item">21</div>
     <div class="item">22</div>
     <div class="item">23</div>
     <div class="item">24</div>
     <div class="item">25</div>
     <div class="item">26</div>
     <div class="item">27</div>
     <div class="item">28</div>
     <div class="item">29</div>
     <div class="item">30</div>
     <div class="item">31</div>
     <div class="item">32</div>
     <div class="item">33</div>
     <div class="item">34</div>
     <div class="item">35</div>
     <div class="item">36</div>

    </body>
    <style>
      body {
        background-color: cornflowerblue;
        font-size: 40px;
        padding: 5%;
        color: white;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
      }

      .item {
        display: inline-block;
        margin: 10px;
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
      }
    </style>    
  </html>`
}