import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import { tss } from 'tss-react/mui'
import backgroundImage from './assets/img/pattern.png'
const UserProfileFormFields = lazy(
    () => import("./UserProfileFormFields")
);

const Login = lazy(() => import("./pages/Login"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const Info = lazy(() => import("./pages/Info"));
const Error = lazy(() => import("./pages/Error"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    const { classes } = useStyles()

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "error.ftl": return (
                        <Error
                            {...{ kcContext, i18n, classes }}
                            Template={Template}
                            doUseDefaultCss={true}
                        />
                    );
                    case "info.ftl": return (
                        <Info
                            {...{ kcContext, i18n, classes }}
                            Template={Template} doUseDefaultCss={true} />);
                    case "login-update-password.ftl": return (
                        <LoginUpdatePassword
                            {...{ kcContext, i18n, classes }}
                            Template={Template}
                            doUseDefaultCss={true}
                        />
                    );
                    case "login.ftl": return (
                        <Login
                            {...{ kcContext, i18n, classes }}
                            Template={Template}
                            doUseDefaultCss={true}
                        />
                    );
                    case "login-reset-password.ftl": return (
                        <LoginResetPassword
                            {...{ kcContext, i18n, classes }}
                            Template={Template}
                            doUseDefaultCss={true}
                        />
                    );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const useStyles = tss.create({
    kcHtmlClass: {},
    kcBodyClass: {
        background: `url(${backgroundImage}) repeat fixed center #e5e7eb`,
    },
} satisfies { [key in ClassKey]?: unknown })
