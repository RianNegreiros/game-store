import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Row, Col } from 'react-bootstrap'
import TitleAndPath from './TitleAndPath'
import SearchAndIcon from './SearchAndIcon'
import styles from './styles.module.css'

interface TitleAdminPanelProps {
    title: String,
    path: String,
    icon?: IconProp
    newPath?: string
}

export default function TitleAdminPanel({ title, path, icon, newPath }: TitleAdminPanelProps) {
    return (
        <Row className="mt-4">
            {
                (icon) ?
                    <>
                        <Col lg={6} xs={4} className={styles.title_and_path}>
                            <TitleAndPath title={title} path={path} />
                        </Col>

                        <Col lg={6} xs={8}>
                            <SearchAndIcon icon={icon} newPath={newPath} />
                        </Col>
                    </>
                    :
                    <TitleAndPath title={title} path={path} />
            }
        </Row>
    )
}