import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
// import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        // displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    // const { auth, url, message, isAppInitiatedAction } = kcContext;

    const { auth, url } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    console.log(headerNode)

    return (
        <div className={kcClsx("kcLoginClass")} style={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <div id="kc-header" className={kcClsx("kcHeaderClass")}>
                {/* <div id="kc-header-wrapper" className={kcClsx("kcHeaderWrapperClass")}>
                    {msg("loginTitleHtml", realm.displayNameHtml)}
                </div> */}
            </div>
            <div className={kcClsx("kcFormCardClass")} style={{ border: "none", borderRadius: '15px', backgroundColor: 'rgba(255,255,255,0.9)' }}>
                <header className={kcClsx("kcFormHeaderClass")} style={{ margin: "-20px -40px 0px", backgroundColor: '#eff6ff', padding: "0px 40px", borderTopRightRadius: '15px', borderTopLeftRadius: "15px" }}>
                    {/* {enabledLanguages.length > 1 && (
                        <div className={kcClsx("kcLocaleMainClass")} id="kc-locale">
                            <div id="kc-locale-wrapper" className={kcClsx("kcLocaleWrapperClass")}>
                                <div id="kc-locale-dropdown" className={clsx("menu-button-links", kcClsx("kcLocaleDropDownClass"))}>
                                    <button
                                        tabIndex={1}
                                        id="kc-current-locale-link"
                                        aria-label={msgStr("languages")}
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        aria-controls="language-switch1"
                                    >
                                        {currentLanguage.label}
                                    </button>
                                    <ul
                                        role="menu"
                                        tabIndex={-1}
                                        aria-labelledby="kc-current-locale-link"
                                        aria-activedescendant=""
                                        id="language-switch1"
                                        className={kcClsx("kcLocaleListClass")}
                                    >
                                        {enabledLanguages.map(({ languageTag, label, href }, i) => (
                                            <li key={languageTag} className={kcClsx("kcLocaleListItemClass")} role="none">
                                                <a role="menuitem" id={`language-${i + 1}`} className={kcClsx("kcLocaleItemClass")} href={href}>
                                                    {label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )} */}
                    {(() => {
                        const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                            <div style={{ display: "flex", padding: "30px 0px 10px", flexDirection: "column", gap: '10px' }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <img src="https://static.tnex.com.vn/uploads/2022/06/logo.png" style={{ height: "50px", width: "auto" }}></img>
                                    {enabledLanguages.length > 1 && (
                                        <div className={kcClsx("kcLocaleMainClass")} id="kc-locale">
                                            <div id="kc-locale-wrapper" className={kcClsx("kcLocaleWrapperClass")}>
                                                <div id="kc-locale-dropdown" className={clsx("menu-button-links", kcClsx("kcLocaleDropDownClass"))}>
                                                    <button
                                                        tabIndex={1}
                                                        id="kc-current-locale-link"
                                                        aria-label={msgStr("languages")}
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                        aria-controls="language-switch1"
                                                    >
                                                        {currentLanguage.label}
                                                    </button>
                                                    <ul
                                                        role="menu"
                                                        tabIndex={-1}
                                                        aria-labelledby="kc-current-locale-link"
                                                        aria-activedescendant=""
                                                        id="language-switch1"
                                                        className={kcClsx("kcLocaleListClass")}
                                                    >
                                                        {enabledLanguages.map(({ languageTag, label, href }, i) => (
                                                            <li key={languageTag} className={kcClsx("kcLocaleListItemClass")} role="none">
                                                                <a
                                                                    role="menuitem"
                                                                    id={`language-${i + 1}`}
                                                                    className={kcClsx("kcLocaleItemClass")}
                                                                    href={href}
                                                                >
                                                                    {label}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {headerNode}
                            </div>
                        ) : (
                            <div id="kc-username" className={kcClsx("kcFormGroupClass")}>
                                <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                                <a id="reset-login" href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
                                    <div className="kc-login-tooltip">
                                        <i className={kcClsx("kcResetFlowIcon")}></i>
                                        <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                    </div>
                                </a>
                            </div>
                        );

                        if (displayRequiredFields) {
                            return (
                                <div className={kcClsx("kcContentWrapperClass")}>
                                    <div className={clsx(kcClsx("kcLabelWrapperClass"), "subtitle")}>
                                        <span className="subtitle">
                                            <span className="required">*</span>
                                            {msg("requiredFields")}
                                        </span>
                                    </div>
                                    <div className="col-md-10">{node}</div>
                                </div>
                            );
                        }

                        return node;
                    })()}
                </header>
                <div id="kc-content">
                    <div id="kc-content-wrapper">
                        {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                        {/* {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                            <div
                                className={clsx(
                                    `alert-${message.type}`,
                                    kcClsx("kcAlertClass"),
                                    `pf-m-${message?.type === "error" ? "danger" : message.type}`
                                )}
                            >
                                <div className="pf-c-alert__icon">
                                    {message.type === "success" && <span className={kcClsx("kcFeedbackSuccessIcon")}></span>}
                                    {message.type === "warning" && <span className={kcClsx("kcFeedbackWarningIcon")}></span>}
                                    {message.type === "error" && <span className={kcClsx("kcFeedbackErrorIcon")}></span>}
                                    {message.type === "info" && <span className={kcClsx("kcFeedbackInfoIcon")}></span>}
                                </div>
                                <span
                                    className={kcClsx("kcAlertTitleClass")}
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(message.summary)
                                    }}
                                />
                            </div>
                        )} */}
                        {children}
                        {auth !== undefined && auth.showTryAnotherWayLink && (
                            <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                                <div className={kcClsx("kcFormGroupClass")}>
                                    <input type="hidden" name="tryAnotherWay" value="on" />
                                    <a
                                        href="#"
                                        id="try-another-way"
                                        onClick={() => {
                                            document.forms["kc-select-try-another-way-form" as never].submit();
                                            return false;
                                        }}
                                    >
                                        {msg("doTryAnotherWay")}
                                    </a>
                                </div>
                            </form>
                        )}
                        {socialProvidersNode}
                        {displayInfo && (
                            <div id="kc-info" className={kcClsx("kcSignUpClass")} >
                                <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")} style={{ borderBottomRightRadius: '15px', borderBottomLeftRadius: '15px' }}>
                                    {infoNode}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div style={{ fontSize: '13px', margin: '10px', color: '#64748b', fontWeight: '600' }}>Powered by Nexusti JSC</div>
        </div>
    );
}
