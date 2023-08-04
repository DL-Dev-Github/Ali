import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';

export const CustomConnectButton = () => {

  
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
              'aria-hidden': true,
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
                    borderRadius: '999px',
                    border: '3px solid #b1841d', 
                    backgroundColor: 'black',
                    color: 'white',
                    fontFamily: 'brandon-grotesque',
                    padding: '1.5vh 1.5vh',
                    fontSize: '1.75vh',
                    fontWeight: 600,
                    lineHeight: '1.5vh',
                  }} >
                    Connect Wallet
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
                    padding: '1.5vh 1.5vh',
                    fontSize: '1.75vh',
                    fontWeight: 600,
                    lineHeight: '1.5vh',
                  }} >
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>          
                  <button onClick={openConnectModal} type="button" style={{
                    borderRadius: '999px',
                    border: '3px solid #b1841d', 
                    backgroundColor: 'black',
                    color: 'white',
                    fontFamily: 'brandon-grotesque',
                    padding: '1.5vh 1.5vh',
                    fontSize: '1.75vh',
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