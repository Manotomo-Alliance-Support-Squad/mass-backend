import { MultiArtwork } from '../../models/artwork';
import MultiArtworkCard from './artworkCard/multiArtworkCard';
import DisplayedLanguage from "../../models/language";
import BaseSection, {BaseSectionProps, BaseSectionState} from "../../shared/components/baseSection/baseSection";
import { CardStyles } from "../../shared/components/baseCard/baseCard";
import './gallerySection.css';

interface MultiGallerySectionProps extends BaseSectionProps<MultiArtwork> {
}

interface MultiGallerySectionState extends BaseSectionState {

}


export default class MultiGallerySection extends BaseSection<MultiArtwork> {
    renderCard(object: MultiArtwork, cardStyleIndex: number, language: DisplayedLanguage, id: number): JSX.Element {
        return (
            // TODO: edit gallery-section to display at a specific scale
            <div className="gallery-section">
                <MultiArtworkCard key={object.metadata.metadataID} object={object} cardStyleIndex={id % CardStyles.length}/>
            </div>
        );
    }
}
