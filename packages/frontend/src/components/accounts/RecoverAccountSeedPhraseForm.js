import React from 'react';
import { Translate } from 'react-localize-redux';

import classNames from '../../utils/classNames';
import FormButton from '../common/FormButton';

const RecoverAccountSeedPhraseForm = (
    {
        isLegit,
        handleChange,
        seedPhrase,
        localAlert,
        recoveringAccount,
        findMyAccountSending
    }
) => {
    const inputClass = classNames([
        { 'success': localAlert && localAlert.success },
        { 'problem': localAlert && localAlert.success === false }
    ]);

    return (
        <>
            <h4><Translate id='recoverSeedPhrase.seedPhraseInput.title' /></h4>
            <Translate>
                {({ translate }) => (
                    <input
                        value={seedPhrase}
                        onChange={(e) => handleChange(e.target.value)}
                        className={inputClass}
                        placeholder={translate('recoverSeedPhrase.seedPhraseInput.placeholder')}
                        disabled={recoveringAccount}
                        data-test-id="seedPhraseRecoveryInput"
                        required
                        tabIndex='2'
                        autoCapitalize='off'
                    />
                )}
            </Translate>
            <FormButton
                type='submit'
                color='dark-green'
                disabled={!isLegit || recoveringAccount}
                sending={findMyAccountSending}
                sendingString='button.recovering'
                data-test-id="seedPhraseRecoverySubmitButton"
            >
                <Translate id='button.findMyAccount' />
            </FormButton>
        </>
    );
}

export default RecoverAccountSeedPhraseForm;
