export interface RecoveryResponse {
    sent?: boolean
    approved?: boolean
    code?: string
}

export interface SendMailOTP {
    url: '/auth/sendMailOTP'
    email: string
    changePass: true
}

export interface SendMobileOTP {
    url: '/auth/sendMobileOTP'
    phone: string
    changePass: true
}

export interface CheckMailOTP {
    url: '/auth/checkMailOTP'
    email: string
    code: string
    changePass: true
}

export interface CheckMobileOTP {
    url: '/auth/checkMobileOTP'
    phone: string
    code: string
    changePass: true
}

export interface RenewPasswordWithMail {
    url: '/auth/renewPasswordWithMail'
    email: string
    code: string
}

export interface RenewPasswordWithMobile {
    url: '/auth/renewPasswordWithMobile'
    phone: string
    code: string
}

export type Recovery =
    SendMailOTP
    | SendMobileOTP
    | CheckMailOTP
    | CheckMobileOTP
    | RenewPasswordWithMail
    | RenewPasswordWithMobile
