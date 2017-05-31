const navbarHeightPx = 52;
const concertTitleHeightPx = 100;


export const fullHeight = {
    height: '100%'
};

const clickable = {
    cursor: 'pointer'
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
            top: concertTitleHeightPx.toString() + 'px',
            left: '0',
            right: '0',
            bottom: '0',
            position: 'absolute',
            width: 'auto',
            height: 'auto',
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
export const concertContainerStyle = {
    mainContainer: Object.assign({
        top: navbarHeightPx.toString() + 'px',
        left: '0',
        right: '0',
        bottom: '0',
        position: 'absolute',
        width: 'auto',
        height: 'auto',
        overflow: 'hidden'
    })
}
export const concertContainerMainTitleStyle = {
    mainRow: Object.assign({
            height: concertTitleHeightPx.toString() + 'px'
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
            'float': 'right',
            marginTop: '35px'
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
        },
        ),

    ticketsExchange: Object.assign({
            overflow: 'scroll'
        },
        fullHeight,
        shadowBorder,
        noGutters
    )
};
export const concertExchangeRowStyle = {
    mainRow: Object.assign({
            height: '100px',
        },
        shadowBorder,
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

export const concertExchangeSectionRowStyle = {
    mainRow: Object.assign({
            height: '125px'
        },
        shadowBorder,
        clickable
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
            borderLeft: '10px solid red'
        },
        shadowBorder
    ),
    activeSection: Object.assign({
            background: 'none repeat scroll 0 0 #FFCF8B'
        }
    ),
    hoveredSection: Object.assign({
        background: 'none repeat scroll 0 0 #FFCF8B'
    })
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

export const sellContainerMainBodyStyle = {
    mainRow: Object.assign({
            top: navbarHeightPx.toString() + 'px',
            left: '0',
            right: '0',
            bottom: '0',
            position: 'absolute',
            width: 'auto',
            height: 'auto',
        },
        shadowBorder
    )
}

export const sellContainerStyle = {
    mainContainer: Object.assign({
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        position: 'absolute',
        width: 'auto',
        height: 'auto',
        overflow: 'hidden'
    })
}
