/// <reference types="node" />
import { UrlObject } from 'url';
import React, { Component } from 'react';
declare type Url = string | UrlObject;
declare type FormatResult = {
    href: string;
    as?: string;
};
declare type LinkProps = {
    href: Url;
    as?: Url | undefined;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    onError?: (error: Error) => void;
    prefetch?: boolean;
};
declare class Link extends Component<LinkProps> {
    static propTypes?: any;
    static defaultProps: Partial<LinkProps>;
    cleanUpListeners: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleRef(ref: Element): void;
    formatUrls: (href: string | UrlObject, as?: string | UrlObject | undefined) => FormatResult;
    linkClicked: (e: React.MouseEvent<Element, MouseEvent>) => void;
    prefetch(): void;
    render(): React.DetailedReactHTMLElement<{
        onMouseEnter: (event: React.MouseEvent<Element, MouseEvent>) => void;
        onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
        href?: string | undefined;
        ref?: any;
    }, HTMLElement>;
}
export default Link;
