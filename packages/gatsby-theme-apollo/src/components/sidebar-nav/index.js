import Category from './category';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import colors from '../../util/colors';
import styled from '@emotion/styled';
import {Link, withPrefix} from 'gatsby';

const StyledList = styled.ul({
  marginLeft: 0,
  listStyle: 'none'
});

const StyledListItem = styled.li({
  fontSize: '1rem',
  a: {
    color: 'inherit',
    textDecoration: 'none',
    ':hover': {
      opacity: colors.hoverOpacity
    },
    '&.active': {
      color: colors.primary,
      pointerEvents: 'none'
    }
  }
});

export default class SidebarNav extends Component {
  static propTypes = {
    alwaysExpanded: PropTypes.bool,
    contents: PropTypes.array.isRequired,
    pathname: PropTypes.string.isRequired
  };

  isPageSelected = ({path}) => {
    const [prefixedPath, pathname] = [
      withPrefix(path),
      this.props.pathname
    ].map(string => string.replace(/\/$/, ''));
    return prefixedPath === pathname;
  };

  renderPages(pages, key) {
    return (
      <StyledList key={key}>
        {pages.map(page => (
          <StyledListItem key={page.path}>
            {page.anchor ? (
              <a href={page.path}>{page.title}</a>
            ) : (
              <Link
                className={this.isPageSelected(page) ? 'active' : null}
                to={page.path}
              >
                {page.title}
              </Link>
            )}
          </StyledListItem>
        ))}
      </StyledList>
    );
  }

  render() {
    return (
      <Fragment>
        {this.props.contents.map(({title, path, pages}) => {
          const contents = this.renderPages(pages, title);
          if (!title) {
            return contents;
          }

          return (
            <Category
              key={title}
              title={title}
              path={path}
              active={pages.some(this.isPageSelected)}
              alwaysExpanded={this.props.alwaysExpanded}
            >
              {contents}
            </Category>
          );
        })}
      </Fragment>
    );
  }
}
