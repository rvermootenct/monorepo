import * as Styled from "./style"
import colors from "@Colors"

import MultiButton from "@Components/shared/MultiButton"
import { useDispatch } from "@Redux/store"
import { useActiveKit } from "@Redux/slices/dashboard/selectors"
import { updateFeatured } from "@Redux/slices/dashboard"

const Featured = ({ ...props }) => {
	const dispatch = useDispatch()
	const {
		userData: { featured }
	} = useActiveKit()

	return (
		<Styled.Container>
			<Styled.HorizFlex>
				<Styled.Header>FEATURED</Styled.Header>
				<div style={{ flexBasis: "200px" }}>
					<MultiButton
						wrapperBackgroundColor={colors.lightest}
						values={[
							{
								text: "YUP",
								backgroundColor: colors.gold
							},
							{
								text: "NOPE"
							}
						]}
						activeValue={featured ? "YUP" : "NOPE"}
						onClick={() => dispatch(updateFeatured(!featured))}
					/>
				</div>
			</Styled.HorizFlex>
			<Styled.ParagraphHelper>
				If you select this option, this kit will be displayed at the top of your kits list.
			</Styled.ParagraphHelper>
		</Styled.Container>
	)
}

export default Featured
