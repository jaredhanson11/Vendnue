export const fullHeight = {
    height: '100%'
};

export const vcenter = {
    display: 'inline-block',
    verticalAlign: 'middle',
    'float': 'none'
};

export const noGutters = {
    paddingRight: 0,
    paddingLeft: 0
};

export function devBorder(color){
    return {
        border: 'thin solid ' + color
    }
};

const shadowBorder = {
    boxShadow: '0px 0px 2px 2px lightgrey'
};

export const concertContainerMainBodyStyle = {
    mainRow: Object.assign({
            height: '75%'
        },
        shadowBorder
    ),
    mapBox: Object.assign({
            paddingLeft: '2px',
            paddingRight: '2px'
        },
        fullHeight,
        shadowBorder
    ),
    ticketsBox: Object.assign({
            paddingLeft: '2px',
            paddingRight: '2px'
        },
        fullHeight,
        shadowBorder
    ),
    socialMediaBox: Object.assign({
            paddingLeft: '2px',
            paddingRight: '2px'
        },
        fullHeight,
        shadowBorder
    )
};
export const concertContainerMainTitleStyle = {
    mainRow: Object.assign({
            height: '100px'
        }),

    mainCol: Object.assign({
        },
        fullHeight,
        shadowBorder
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
            marginTop: '5%'
        })
};

export const concertExchangeSectionStyle = {
    mainRow: Object.assign({
            height: '90%',
            marginTop: '5%'
        }),

    ticketsExchange: Object.assign({
            overflow: 'scroll'
        },
        fullHeight,
        shadowBorder
    )
};
export const concertExchangeRowStyle = {
    mainRow: Object.assign({
            height: '100px',
        },
    ),

    ticketPrice: Object.assign({
            textAlign: 'center',
            paddingTop: '35px'
        },
        fullHeight
    )
};
export const concertExchangeRowPriceStyle = {
    mainRow: Object.assign({
        },
        fullHeight
        ),
};
export const concertExchangeRowHeadersStyle = {
    mainRow: Object.assign({
        },
    ),
    priceHeader: Object.assign({
            textAlign: 'center',
        },
    )

};

export const concertExchangeSectionRowHeadersStyle = {
    mainRow: Object.assign({
        },
    ),
    sectionHeader: Object.assign({
            textAlign: 'center',
        },
        shadowBorder
    )

};

export const concertExchangeSectionRowStyle = {
    mainRow: Object.assign({
            height: '125px'
        },
        shadowBorder
    ),
    sectionName: Object.assign({
            textAlign: 'center',
            marginTop: '25px'
        },
    ),
    sectionData: Object.assign({
            marginTop: '20px'
        }
    ),
    sectionTicketRows: Object.assign({
            marginLeft: '10px',
            marginRight: '10px'
        },
        shadowBorder
    ),
    activeSection: Object.assign({
            background: 'none repeat scroll 0 0 #FFCF8B'
        }
    )
}

export const socialMediaPanelStyle = {
    general: Object.assign({
        height: '175px',
        width: '175x',
        },
        devBorder('blue')
    )
};

export const sectionDataSectionStyle = {
    mainCol: Object.assign({
        },
        shadowBorder
    )
};
