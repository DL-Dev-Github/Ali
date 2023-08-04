import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';

export const CustomConnectButton2 = () => {

  const buttonStyle = {
    height: "60px",
    width: "250px",
    color: "white",
    fontSize: "20px",
    borderRadius: "4px",
    backgroundColor: "#3f51b5",
  };

  return (
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === 'authenticated');
            return (
              <div
                {...(!ready && {
                  'aria-hidden': false,
                  'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                     
                      <button onClick={openConnectModal} type="button" style={{
                        border: '2px solid #d0112b', 
                        borderRadius: '10px',
                        backgroundColor: '#d0112b',
                        color: 'white',
                        fontFamily: 'brandon-grotesque',
                        padding: '2.5vh 2.5vw',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        lineHeight: '1.5vh',
                      }}>
                        CONNECT WALLET
                      </button>
                    );
                  }
                  if (chain.unsupported) {
                    return (
                      <button onClick={openChainModal} type="button" style={{
                        borderRadius: '999px',
                        border: '3px solid #b1841d', 
                        backgroundColor: 'black',
                        color: 'white',
                        fontFamily: 'brandon-grotesque',
                        padding: '2.5vh 2.5vw',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        lineHeight: '1.5vh',
                      }} >
                        Wrong network
                      </button>
                    );
                  }
                  return (
                    <div style={{ display: 'flex', gap: 12 }}>          
                      <button onClick={openAccountModal} type="button" style={{
                        borderRadius: '999px',
                        border: '3px solid #b1841d', 
                        backgroundColor: 'black',
                        color: 'white',
                        fontFamily: 'brandon-grotesque',
                        padding: '2.5vh 2.5vw',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        lineHeight: '1.5vh',
                      }} >
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ''}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      );
};
