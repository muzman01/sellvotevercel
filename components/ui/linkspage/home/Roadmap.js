import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import DrawSvg from "./DrawSvg";

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.body};
  position: relative;
  display: inline-block;
  overflow: hidden;

`;
const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  color: ${(props) => props.theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  border-bottom: 2px solid ${(props) => props.theme.text};
  width: fit-content;

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.body};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 64em) {
    width: 80%;
  }
  @media (max-width: 48em) {
    width: 90%;
  }
`;
const SvgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Items = styled.ul`
  list-style: none;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: lightblue; */

  @media (max-width: 48em) {
    width: 90%;
  }

  & > *:nth-of-type(2n + 1) {
    justify-content: start;
    @media (max-width: 48em) {
      justify-content: center;
    }

    div {
      border-radius: 50px 0 50px 0;
      text-align: right;

      @media (max-width: 48em) {
        border-radius: 0 50px 0 50px;
      text-align: left;
        p {
          border-radius: 0 40px 0 40px;

        }
      }
    }
    p {
      border-radius: 40px 0 40px 0;
    }
  }
  & > *:nth-of-type(2n) {
    justify-content: end;
    @media (max-width: 48em) {
      justify-content: center;
    }
    div {
      border-radius: 0 50px 0 50px;
      text-align: left;

      
    }
    p {
      border-radius: 0 40px 0 40px;
    }
  }
`;
const Item = styled.li`
  width: 100%;
  height: 100%;
  display: flex;

  @media (max-width: 48em) {
    justify-content: flex-end !important;
  }
`;
const ItemContainer = styled.div`
  width: 40%;
  height: fit-content;
  padding: 1rem;
  border: 3px solid ${(props) => props.theme.text};

  @media (max-width: 48em) {
    width: 70%;

  }
`;

const Box = styled.p`
  height: fit-content;
  background-color: #EEEDDE;
  color: ${(props) => props.theme.text};
  padding: 1rem;
  position: relative;
  border: 1px solid ${(props) => props.theme.text};
`;
const SubTitle = styled.span`
  display: block;
  font-size: ${(props) => props.theme.fontxl};
  text-transform: capitalize;
  color: ${(props) => props.theme.text};

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontlg};
    font-weight: 600;
  }
`;
const Text = styled.span`
  display: block;
  font-size: ${(props) => props.theme.fontsm};
  text-transform: capitalize;
  color: ${(props) => props.theme.text};

  font-weight: 400;
  margin: 0.5rem 0;
  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxs};
  }
`;

const RoadMapItem = ({ title, subtext, addToRef }) => {
  return (
    <Item ref={addToRef}>
      <ItemContainer>
        <Box>
          <SubTitle>{title} </SubTitle>
          <Text>{subtext}</Text>
        </Box>
      </ItemContainer>
    </Item>
  );
};

const Roadmap = () => {
  const revealRefs = useRef([]);
  revealRefs.current = [];
  gsap.registerPlugin(ScrollTrigger);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useLayoutEffect(() => {
    let t1 = gsap.timeline();
    revealRefs.current.forEach((el, index) => {
      t1.fromTo(
        el.childNodes[0],
        {
          y: "0",
        },
        {
          y: "-30%",

          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: el,
            start: "top center+=200px",
            end: "bottom center",
            scrub: true,
            // markers:true,
          },
        }
      );
    });

    return () => {
      if (t1) t1.kill();
    };
  }, []);
//güncelleme
  return (
    <Section id="roadmap">
      <Title><h1>Bot Kullanımı</h1></Title>
      <Container>
        <SvgContainer>
          <DrawSvg />
        </SvgContainer>
        <Items>
          <Item>&nbsp;</Item>
          <RoadMapItem
            addToRef={addToRefs}
            title="1. Adım"
            subtext="Kullanılan tarayıca TronLink yüklü olmalıdır, Eğer yüklü değilse sistem size yükleme yapmanız için uyarı ve link verecektir"
          />
          <RoadMapItem
            addToRef={addToRefs}
            title="2. Adım'"
            subtext="Tronlik kurulu ise ve tronlinke bağlandıysanız sisteme otomatik olarak giriş yapmış sayılacaksınız"
          />
          <RoadMapItem
            addToRef={addToRefs}
            title="3.Aadım"
            subtext="Buy vote kısmına geldiğinizde sistem size Robinia hesabının mevcut oy gücünü gösterecektir.(görsel1) Oy satın almak için Connect Wallet butonuna tıklayıp Tronlink bağlantınızı onaylamanız gerekmektedir.(görsel2)."
          />
          <RoadMapItem
            addToRef={addToRefs}
            title="4. Adım"
            subtext=" Tronlink bağlantısı onaylandıktan sonra karşınıza oy alacağınız gönderinin linkini girmeniz için bir alan çıkacaktır(Lütfen Eksiksiz Giriniz)(görsel3)Daha sonra yüzde
            kaç oy almak istiyorsanız seçebileceğiniz bir bar çıkacaktır(görsel4)."
          />
          <RoadMapItem
            addToRef={addToRefs}
            title="5. Adım"
            subtext="Bilgileriniz girdikten sonra eksiksiz olduğunu onaylamanız için bir buton çıkacaktır(görsel5) bu butonu onayladıktan sonra ödeme yapma butonunuz aktifleşesek"
          />
            <RoadMapItem
            addToRef={addToRefs}
            title="6. Adım"
            subtext="Ödeme botunu aktif olduğu zaman, ödeme yap kısmına tıkladığınızda bir popup açılacak ve ödemeyi onaylamanız istenilecek(görsel6), işlemi onayladığınız taktirde 
            oy satın almış olacak ve oyunuz kullanılmış olacak.İşlemlerinizin durumunu Kullanıcı İşlemleri kısmından görebilirsiniz. cüzdan numaranız sayfada yazdıktan sonra 
            yenile butonuna bastığınız zaman kaydedilmiş, yapılmış bütün işlemlerinizi görebilirsiniz."
          />
        </Items>
      </Container>
    </Section>
  );
};

export default Roadmap;
