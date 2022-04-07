import React, { useState } from "react";
import { withTranslation } from 'react-i18next';
import i18n from "../../../../i18n"
import Image from 'next/image'
 function Qa() {
  const [isqa1, setisqa1] = useState(false);
  const [isqa2, setisqa2] = useState(false);
  const [isqa3, setisqa3] = useState(false);
  const [isqa4, setisqa4] = useState(false);
  const [isqa5, setisqa5] = useState(false);
  const [isqa6, setisqa6] = useState(false);
  return (
    <div className="qa" id="faq">
      <h1 style={{ marginBottom: "50px" }}>
        
       
        {i18n.t('BlokField')} <br />
        {i18n.t(' Bot Kullanımı')}
      </h1>
      <div className="qaLine1">
        <div className={!isqa1 ? `questions` : `questionsAfter`}>
          <div className="question">
            <p>{i18n.t('1. Adım')}</p>
            {!isqa1 ? (
              <p style={{ cursor: "pointer" }} onClick={() => setisqa1(true)}>
                +
              </p>
            ) : (
              <p style={{ cursor: "pointer" }} onClick={() => setisqa1(false)}>
                -
              </p>
            )}
          </div>
          {isqa1 ? (
            <p >
              {i18n.t('1-) Kullanılan tarayıca TronLink yüklü olmalıdır, Eğer yüklü değilse sistem size yükleme yapmanız için uyarı ve link verecektir')}
            </p>

          ) : null}
        </div>

      </div>

      <div className="qaLine2">
        <div className={!isqa3 ? `questions3` : `questions3After`}>
          <div className="question3">
            <p>{i18n.t('2. Adım')}</p>
            {!isqa3 ? (
              <p style={{ cursor: "pointer" }} onClick={() => setisqa3(true)}>
                +
              </p>
            ) : (
              <p style={{ cursor: "pointer" }} onClick={() => setisqa3(false)}>
                -
              </p>
            )}
          </div>
          {isqa3 ? (
              <>
            <p>
              {i18n.t('	2-) Tronlik kurulu ise ve tronlinke bağlandıysanız sisteme otomatik olarak giriş yapmış sayılacaksınız')}
            </p>
      
            </>
          ) : null}
        </div>
    
        </div>
        <div className="qaLine2">
        <div className={!isqa6 ? `questions5` : `questions5After`}>
          <div className="question5">
            <p>{i18n.t('3. Adım')}</p>
            {!isqa6 ? (
              <p style={{ cursor: "pointer" }} onClick={() => setisqa6(true)}>
                +
              </p>
            ) : (
              <p style={{ cursor: "pointer" }} onClick={() => setisqa6(false)}>
                -
              </p>
            )}
          </div>
          {isqa6 ? (
            <p>
              {i18n.t('3-) Buy vote kısmına geldiğinizde sistem size Robinia hesabının mevcut oy gücünü gösterecektir.(görsel1) Oy satın almak için "Connect Wallet" butonuna tıklayıp Tronlink bağlantınızı onaylamanız gerekmektedir.(görsel2). ')}
              <div>
            <Image src="/assets/görsel2.png" width={600} height={500} />
          </div>
            </p>
          ) : null}
        </div>
        
      </div>
      <div className="qaLine2">
        <div className={!isqa2 ? `questions5` : `questions5After`}>
          <div className="question5">
            <p>{i18n.t('4. Adım')}</p>
            {!isqa2 ? (
              <p style={{ cursor: "pointer" }} onClick={() => setisqa2(true)}>
                +
              </p>
            ) : (
              <p style={{ cursor: "pointer" }} onClick={() => setisqa2(false)}>
                -
              </p>
            )}
          </div>
          {isqa2 ? (
            <p>
              {i18n.t('4-) Tronlink bağlantısı onaylandıktan sonra karşınıza oy alacağınız gönderinin linkini girmeniz için bir alan çıkacaktır(Lütfen Eksiksiz Giriniz)(görsel3)Daha sonra yüzde kaç oy almak istiyorsanız seçebileceğiniz bir bar çıkacaktır(görsel4)')}
              <div>
            <Image src="/assets/görsel4.png" width={600} height={500} />
          </div>
            </p>
          ) : null}
        </div>
        
      </div>
      <div className="qaLine2">
        <div className={!isqa5 ? `questions5` : `questions5After`}>
          <div className="question5">
            <p>{i18n.t('5. Adım')}</p>
            {!isqa5 ? (
              <p style={{ cursor: "pointer" }} onClick={() => setisqa5(true)}>
                +
              </p>
            ) : (
              <p style={{ cursor: "pointer" }} onClick={() => setisqa5(false)}>
                -
              </p>
            )}
          </div>
          {isqa5 ? (
            <p>
              {i18n.t('5-) Bilgileriniz girdikten sonra eksiksiz olduğunu onaylamanız için bir buton çıkacaktır(görsel5) bu butonu onayladıktan sonra ödeme yapma butonunuz aktifleşesek')}
              <div>
            <Image src="/assets/görsel5.png" width={600} height={500} />
          </div>
            </p>
          ) : null}
        </div>
        
      </div>
      <div className="qaLine2">
        <div className={!isqa4 ? `questions6` : `questions6After`}>
          <div className="question6">
            <p>{i18n.t('6. Adım')}</p>
            {!isqa4 ? (
              <p style={{ cursor: "pointer" }} onClick={() => setisqa4(true)}>
                +
              </p>
            ) : (
              <p style={{ cursor: "pointer" }} onClick={() => setisqa4(false)}>
                -
              </p>
            )}
          </div>
          {isqa4 ? (
            <p>
              {i18n.t('	6-) Ödeme botunu aktif olduğu zaman, ödeme yap kısmına tıkladığınızda bir popup açılacak ve ödemeyi onaylamanız istenilecek(görsel6), işlemi onayladığınız taktirde oy satın almış olacak ve oyunuz kullanılmış olacak.İşlemlerinizin durumunu "Kullanıcı İşlemleri" kısmından görebilirsiniz. cüzdan numaranız sayfada yazdıktan sonra yenile butonuna bastığınız zaman kaydedilmiş, yapılmış bütün işlemlerinizi görebilirsiniz.')}
            </p>
          ) : null}
        </div>
        
      </div>
    </div>
  );
}
export default withTranslation()(Qa)