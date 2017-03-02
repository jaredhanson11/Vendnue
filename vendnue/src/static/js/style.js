export const fullHeight = {
    height: '100%'
}

export const noGutters = {
    paddingRight: 0,
    paddingLeft: 0
}

export function devBorder(color){
    return {
        border: 'thin solid ' + color
    }
}


export const concertContainerMainBodyStyle = {
    mainRow: Object.assign({
            height: '75%'
        },
        devBorder('blue')
    ),
    leftMainOuterDiv: Object.assign({
        },
        fullHeight,
        devBorder('green')
    ),
    rightMainOuterDiv: Object.assign({
        },
        fullHeight,
        devBorder('red')
    ),
    footerOuterDiv: Object.assign({
            height: '20%'
        })
};
export const concertContainerMainTitleStyle = {
    mainRow: Object.assign({
            leftMargin: '0px'
        }),

    mainCol: Object.assign({
        },
        devBorder('blue')
    ),

    name: Object.assign({
            'float': 'left'
        }),

    date: Object.assign({
            'float': 'right'
        }),

    artistList: Object.assign({
            clear: 'both'
        }),

    artistName: Object.assign({
            'float': 'left',
            margin: '1px'
        })

};
export const concertMapSectionStyle = {
    mainRow: Object.assign({
            height: '60%',
            marginTop: '10%'
        })
};

export const concertExchangeSectionStyle = {
    mainRow: Object.assign({
            height: '60%',
            marginTop: '10%'
        }),

    ticketsExchange: Object.assign({
            overflow: 'scroll'
        },
        fullHeight,
        devBorder('black')
    )
};
export const concertExchangeRowStyle = {
    mainRow: Object.assign({
            height: '100px',
        },
        devBorder('orange')
    ),

    ticketPrice: Object.assign({
            textAlign: 'center',
            paddingTop: '35px'
        },
        fullHeight,
        devBorder('black')
    )
};
export const concertExchangeRowPriceStyle = {
    mainRow: Object.assign({
        },
        fullHeight
        ),
};
export const concertExchangeStyle = {
};

export const concertExchangeSectionRowStyle = {
    mainRow: Object.assign({
            height: '125px',
        },
        devBorder('green')
    )
}

export const socialMediaPanelStyle = {
    general: Object.assign({
        height: '175px',
        width: '175x',
        },
        devBorder('blue')
    )
}
