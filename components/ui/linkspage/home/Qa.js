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
        {i18n.t('bot use')}
      </h1>
      <div className="qaLine1">
        <div className={!isqa1 ? `questions` : `questionsAfter`}>
          <div className="question">
          <p>1.{i18n.t('Step')}</p>
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
              1-{i18n.t('Metamask must be installed in the browser used. If it is not installed, the system will give you a warning and a link to install it.')}
            </p>

          ) : null}
        </div>

      </div>

      <div className="qaLine2">
        <div className={!isqa3 ? `questions3` : `questions3After`}>
          <div className="question3">
          <p>2.{i18n.t('Step')}</p>
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
              2- {i18n.t('If Metamask is installed and you are connected to Metamask, you will be automatically logged into the system.')}
            </p>
      
            </>
          ) : null}
        </div>
    
        </div>
        <div className="qaLine2">
        <div className={!isqa6 ? `questions5` : `questions5After`}>
          <div className="question5">
          <p>3.{i18n.t('Step')}</p>
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
              3-{i18n.t('When you come to the buy vote part, the system will show you the current voting power of the Robinia account. To buy votes, you need to click the "Connect Wallet" button and connect to Metamask, if you are already connected to the wallet, you can go directly to the payment screen.')}
              <div>
            <Image src="/assets/görsel4.png" width={600} height={500} />
          </div>
            </p>
          ) : null}
        </div>
        
      </div>
      <div className="qaLine2">
        <div className={!isqa2 ? `questions5` : `questions5After`}>
          <div className="question5">
          <p>4.{i18n.t('Step')}</p>
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
              4-{i18n.t('After connecting to Metamask, a box will appear for you to enter the link of the post you will get votes for (Please Enter Completely).')}
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
          <p>5.{i18n.t('Step')}</p>
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
             5- {i18n.t('After entering your information, a button will appear for you to confirm that it is complete, if your payment button is activated after you approve this button.')}
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
            <p>6.{i18n.t('Step')}</p>
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
             6- {i18n.t(' When the payment bot is active, when you click on pay, a popup will appear and you will be asked to confirm the payment. If you approve the transaction, your vote will be purchased and your vote will be used. You can see the status of your transactions in the "User Transactions" section. When you press the refresh button after typing your wallet number on the page, you can see all your recorded and done transactions.')}
            </p>
          ) : null}
        </div>
        
      </div>
    </div>
  );
}
export default withTranslation()(Qa)